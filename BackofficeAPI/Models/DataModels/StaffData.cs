using Backoffice.Models.Domain.ValueObjects;

namespace Backoffice.Models.DataModels;

public class StaffData{

    public string Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    //public FullName FullName { get; private set; }
    public string LicenseNumber { get; set; }
    public string Specialization { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public List<TimeSlot> AvailabilitySlots { get; set; }
}