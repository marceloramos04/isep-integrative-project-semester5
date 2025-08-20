using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Backoffice.Models;
using Backoffice.Models.DTO;
using Xunit;
using System.Net.Http;

namespace BackofficeAPITests.IntegrationTests.Tests
{
    public class PatientIntegrationTests : IClassFixture<CustomWebApplicationFactory<Program>>
    {
        // private readonly CustomWebApplicationFactory<Program> _factory;
        // private readonly HttpClient _client;

        // public PatientIntegrationTests(CustomWebApplicationFactory<Program> factory)
        // {
        //     _factory = factory;
        //     _client = _factory.CreateClient(new WebApplicationFactoryClientOptions
        //     {
        //         AllowAutoRedirect = false
        //     });
        // }

        // [Fact]
        // public async Task SearchPatients_ValidFirstNameAndLastName_ShouldReturnPatients()
        // {
        //     var patientDto = new PatientSearchDTO
        //     {
        //         FirstName = "John",
        //         LastName = "Doe",
                
        //     };

        //     var jsonContent = JsonConvert.SerializeObject(patientDto);
        //     var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

        //     var response = await _client.PostAsync("/api/Patients/Search", content);

        //     response.EnsureSuccessStatusCode();
        //     var responseBody = await response.Content.ReadAsStringAsync();
        //     Assert.NotNull(responseBody);

        //     var jsonDocument = JsonDocument.Parse(responseBody);
        //     var jsonArray = jsonDocument.RootElement;

        //     Assert.True(jsonArray.ValueKind == JsonValueKind.Array, "Response body is not a JSON array");
        //     Assert.True(jsonArray.GetArrayLength() > 0, "No patients returned");

        //     var patient = jsonArray[0];
        //     Assert.Equal("John Doe", patient.GetProperty("Name").GetString());
        // }

        // [Fact]
        // public async Task SearchPatients_InvalidFirstName_ShouldReturnNoResults()
        // {
        //     var patientDto = new PatientDTO
        //     {
        //         FirstName = "InvalidFirstName",
        //         LastName = "Doe",
      
        //     };

        //     var jsonContent = JsonConvert.SerializeObject(patientDto);
        //     var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

        //     var response = await _client.PostAsync("/api/Patients/Search", content);

        //     response.EnsureSuccessStatusCode();
        //     var responseBody = await response.Content.ReadAsStringAsync();
        //     Assert.NotNull(responseBody);

        //     var jsonDocument = JsonDocument.Parse(responseBody);
        //     var jsonArray = jsonDocument.RootElement;

        //     Assert.True(jsonArray.ValueKind == JsonValueKind.Array, "Response body is not a JSON array");
        // }

        // [Fact]
        // public async Task SearchPatients_MissingFirstName_ShouldReturnPatientsByLastName()
        // {
        //     var patientDto = new PatientDTO
        //     {
        //         LastName = "Doe",
           
        //     };

        //     var jsonContent = JsonConvert.SerializeObject(patientDto);
        //     var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

        //     var response = await _client.PostAsync("/api/Patients/Search", content);

        //     response.EnsureSuccessStatusCode();
        //     var responseBody = await response.Content.ReadAsStringAsync();
        //     Assert.NotNull(responseBody);

        //     var jsonDocument = JsonDocument.Parse(responseBody);
        //     var jsonArray = jsonDocument.RootElement;

        //     Assert.True(jsonArray.ValueKind == JsonValueKind.Array, "Response body is not a JSON array");
        //     Assert.True(jsonArray.GetArrayLength() > 0, "No patients returned for LastName 'Doe'");
        // }
    }
}
