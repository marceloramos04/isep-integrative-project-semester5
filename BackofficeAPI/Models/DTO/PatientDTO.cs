using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.Domain.Roots;
namespace Backoffice.Models.DTO;

public class PatientDTO{

    public string MedicalRecordNumber { get; set; }   
    public string FirstName { get; set; }    
    public string LastName { get; set; }        
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public string EmergencyContact { get; set; }
    public List<MedicalCondition> MedicalConditions { get; set; } = new List<MedicalCondition>();
    public List<Appointment> AppointmentHistory { get; set; } = new List<Appointment>();

    public DateTime DateOfBirth { get; set; }
    public string Gender { get; set; }
}