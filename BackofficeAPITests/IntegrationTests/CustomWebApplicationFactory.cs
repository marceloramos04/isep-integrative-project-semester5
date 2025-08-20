using System.Data.Common;
//using DataModel.Repository;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Backoffice.Models;


namespace BackofficeAPITests.IntegrationTests;


public class CustomWebApplicationFactory<Program>
    : WebApplicationFactory<Program> where Program : class
{

    public CustomWebApplicationFactory()
    {
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {

        // based on https://stackoverflow.com/questions/72679169/override-host-configuration-in-integration-testing-using-asp-net-core-6-minimal
        var configurationValues = new Dictionary<string, string>
        {
        };

        var configuration = new ConfigurationBuilder()
            .AddInMemoryCollection(configurationValues)
            .Build();

        builder
            // This configuration is used during the creation of the application
            // (e.g. BEFORE WebApplication.CreateBuilder(args) is called in Program.cs).
            .UseConfiguration(configuration)
            .ConfigureAppConfiguration(configurationBuilder =>
            {
                // This overrides configuration settings that were added as part 
                // of building the Host (e.g. calling WebApplication.CreateBuilder(args)).
                configurationBuilder.AddInMemoryCollection(configurationValues);
            });


        builder.ConfigureServices(services =>
        {
            var dbContextDescriptor = services.SingleOrDefault(
                d => d.ServiceType ==
                    typeof(DbContextOptions<Backoffice.Models.BackofficeContext>));

            services.Remove(dbContextDescriptor);

            var dbConnectionDescriptor = services.SingleOrDefault(
                d => d.ServiceType ==
                    typeof(DbConnection));

            services.Remove(dbConnectionDescriptor);

            // Create open SqliteConnection so EF won't automatically close it.
            services.AddSingleton<DbConnection>(container =>
            {
                var connection = new SqliteConnection("DataSource=:memory:");
                connection.Open();

                return connection;
            });

            services.AddDbContext<BackofficeContext>((container, options) =>
            {
                var connection = container.GetRequiredService<DbConnection>();
                options.UseInMemoryDatabase("BackofficeContext");
            });
        });

        builder.UseEnvironment("Development");
    }
}