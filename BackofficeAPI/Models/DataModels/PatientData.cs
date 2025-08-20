using Backoffice.Models.Domain.ValueObjects;

namespace Backoffice.Models.DataModels;

public class PatientData {

    public string MedicalRecordNumber { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public string EmergencyContact { get; set; }
    public List<MedicalCondition> MedicalConditions { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string Gender { get; set; }
}