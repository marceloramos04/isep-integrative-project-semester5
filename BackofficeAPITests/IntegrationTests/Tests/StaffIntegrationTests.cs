using System.Text;
using System.Text.Json;
//using Application.DTO;
//using DataModel.Repository;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using BackofficeAPITests.IntegrationTests.Helpers;
using Xunit;
using Backoffice.Models;
using Backoffice.Models.DTO;

namespace BackofficeAPITests.IntegrationTests.Tests;


// based on https://learn.microsoft.com/en-us/aspnet/core/test/integration-tests?view=aspnetcore-8.0

public class StaffIntegrationTests 
    : IClassFixture<CustomWebApplicationFactory<Program>>
{
    // private readonly CustomWebApplicationFactory<Program> _factory;

    // private readonly HttpClient _client;

    // public StaffIntegrationTests(CustomWebApplicationFactory<Program> factory)
    // {
    //     _factory = factory;

    //     _client = _factory.CreateClient(new WebApplicationFactoryClientOptions
    //     {
    //         AllowAutoRedirect = false
    //     });
    // }

    // [Theory]
    // //[InlineData("/WeatherForecast")]
    // //[InlineData("/api/colaborator")]
    // [InlineData("/api/Staff")]
    // public async Task Get_EndpointsReturnSuccessAndCorrectContentType(string url)
    // {
    //     // Arrange

    //     // Act
    //     var response = await _client.GetAsync(url);

    //     // Assert
    //     response.EnsureSuccessStatusCode(); // Status Code 200-299
    //     Assert.Equal("application/json; charset=utf-8", 
    //         response.Content.Headers.ContentType.ToString());
    // }

    // [Fact]
    // public async Task Get_ReturnData()
    // {
    //     // Arrange
    //     using (var scope = _factory.Services.CreateScope())
    //     {
    //         var scopedServices = scope.ServiceProvider;
    //         var db = scopedServices.GetRequiredService<BackofficeContext>();

    //         Utilities.ReinitializeDbForTests(db);
    //     }

    //     // Act
    //     var response = await _client.GetAsync("/api/Staff");

    //     // Assert
    //     var responseBody = await response.Content.ReadAsStringAsync();
    //     Assert.NotNull(responseBody);


    //     var jsonDocument = JsonDocument.Parse(responseBody);
    //     var jsonArray = jsonDocument.RootElement;

    //     Assert.True(jsonArray.ValueKind == JsonValueKind.Array, "Response body is not a JSON array");
    //     Assert.Equal(3, jsonArray.GetArrayLength());
    // }

    // [Fact]
    // public async Task Post_AddsStaff()
    // {
    //     // Arrange
    //     var staff = new StaffDTO
    //     {
    //         Id = "D202499999",
    //         FirstName = "Steve",
    //         LastName = "Doe",
    //         LicenseNumber = "675849",
    //         Specialization = "General",
    //         Email = "stevedoe@email.com",
    //         PhoneNumber = "4444444"
    //     };

    //     var jsonContent = JsonConvert.SerializeObject(staff);
    //     var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

    //     // Act
    //     HttpResponseMessage response = await _client.PostAsync("/api/Staff", content);

    //     // Assert
    //     var responseBody = await response.Content.ReadAsStringAsync();
    //     Assert.NotNull(responseBody);


    //     var jsonDocument = JsonDocument.Parse(responseBody);
    // }
}