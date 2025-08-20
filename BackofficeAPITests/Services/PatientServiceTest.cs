using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using Backoffice.Services;
using Backoffice.Models.DTO;
using Backoffice.Models.Domain.Entities;
using Backoffice.Repositories.User;
using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.Domain.Roots;

public class PatientServiceTests
{
    // [Fact]
    // public async Task SearchPatients_ShouldReturnPaginatedAndFilteredResults()
    // {
    //     // Arrange: Configuração inicial e criação dos dados de teste
    //     var mockRepository = new Mock<PatientRepository>(null);
    //     var patientService = new PatientService(mockRepository.Object, null);

    //     // Cria uma lista simulada de pacientes com dados de teste relevantes
    //     var patients = new List<Patient>
    //     {
    //         new Patient(
    //             MedicalRecordNumber.Generate(1),
    //             new FirstName("John"),
    //             new LastName("Doe"),
    //             new PhoneNumber("123456789"),
    //             new Email("john@example.com"),
    //             new PhoneNumber("987654321"),
    //             new DateOfBirth(DateTime.Parse("1985-04-23")),
    //             new Gender("Male")
    //         ),
    //         new Patient(
    //             MedicalRecordNumber.Generate(2),
    //             new FirstName("Jane"),
    //             new LastName("Doe"),
    //             new PhoneNumber("234567890"),
    //             new Email("jane@example.com"),
    //             new PhoneNumber("876543210"),
    //             new DateOfBirth(DateTime.Parse("1990-05-15")),
    //             new Gender("Female")
    //         ),
    //         new Patient(
    //             MedicalRecordNumber.Generate(3),
    //             new FirstName("Mike"),
    //             new LastName("Smith"),
    //             new PhoneNumber("345678901"),
    //             new Email("mike@example.com"),
    //             new PhoneNumber("765432109"),
    //             new DateOfBirth(DateTime.Parse("1978-02-01")),
    //             new Gender("Male")
    //         )
    //     };

    //     // Configura o repositório para retornar a lista simulada de pacientes ao chamar `SearchPatientsAsync`
    //     mockRepository.Setup(repo => repo.SearchPatientsAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()))
    //                   .ReturnsAsync(patients);

    //     // DTO de busca com critérios de filtro que devem coincidir parcialmente com os dados dos pacientes
    //     var searchDto = new PatientSearchDTO { FirstName = "Jo", Email = "example.com" };
    //     int page = 1;
    //     int pageSize = 2;

    //     var result = await patientService.SearchPatients(searchDto);

    //     Assert.NotNull(result);
    //     Assert.Equal(2, result.Count); 

    //     // Verifica se os resultados correspondem ao filtro aplicado
    //     Assert.All(result, patient =>
    //     {
    //         Assert.Contains("Jo", patient.FirstName); // Confirma que o nome contém "Jo"
    //         Assert.Contains("example.com", patient.Email); // Confirma que o email contém "example.com"
    //     });
    // }

    // [Fact]
    // public async Task SearchPatients_InvalidPageSize_ShouldUseDefaultPageSize()
    // {
    //     // Arrange
    //     var mockRepository = new Mock<PatientRepository>(null);
    //     var patientService = new PatientService(mockRepository.Object, null);

    //     // Dados de exemplo para o repositório com apenas um paciente
    //     var patients = new List<Patient> {
    //         new Patient(
    //             MedicalRecordNumber.Generate(1),
    //             new FirstName("John"),
    //             new LastName("Doe"),
    //             new PhoneNumber("123456789"),
    //             new Email("john@example.com"),
    //             new PhoneNumber("987654321"),
    //             new DateOfBirth(DateTime.Parse("1985-04-23")),
    //             new Gender("Male")
    //         )
    //     };

    //     // Configuração do mock do repositório para o retorno esperado
    //     mockRepository.Setup(repo => repo.SearchPatientsAsync(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>(), It.IsAny<DateTime?>(), It.IsAny<string>()))
    //                   .ReturnsAsync(patients);

    //     // Act: Define um `pageSize` inválido para testar o comportamento padrão
    //     var searchDto = new PatientSearchDTO();
    //     var result = await patientService.SearchPatients(searchDto, 1, -1);

    //     // Assert: O tamanho da página deve ser o padrão (10) e retornar o único resultado
    //     Assert.Single(result);
    // }
}
