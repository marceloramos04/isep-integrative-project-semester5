using Microsoft.EntityFrameworkCore;
using Backoffice.Models;
using Backoffice.Services;
using Backoffice;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowAllOrigins",
            builder => builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader()
        );
    });
builder.Services.AddControllers();
builder.Services.AddDbContext<BackofficeContext>(opt =>
    opt.UseInMemoryDatabase("BackofficeAPI"));

//builder.Services.AddHostedService<DataInitializationService>();

builder.Services.AddTransient<IEmailSender, EmailService>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<UserService>();
builder.Services.AddControllersWithViews();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<BackofficeContext>();
    var bootstrap = new Bootstrap(context);
    bootstrap.SetInitialData();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAllOrigins");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

// makes the Program class public so that it can be used for tests (especially for integration tests)
public partial class Program { }