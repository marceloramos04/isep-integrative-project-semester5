using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.Domain.Entities;
namespace Backoffice.Models.DTO;

public class PatientSearchDTO
{
    public string? MedicalRecordNumber { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    public string? Email { get; set; }
    public string? DateOfBirth { get; set; }
}
