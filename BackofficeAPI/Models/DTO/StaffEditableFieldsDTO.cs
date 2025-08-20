using Backoffice.Models.Domain.ValueObjects;

namespace Backoffice.Models.DTO;

public class StaffEditableFieldsDTO
{
    public string? Id { get; set; }
    public string SpecializationCode { get; set; }
    public string PhoneNumber { get; set; }
    public string Email { get; set; }
    public List<TimeSlotDTO>? AvailabilitySlots { get; set; } = new List<TimeSlotDTO>();

}