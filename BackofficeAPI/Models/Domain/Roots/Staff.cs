using Backoffice.Models.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace Backoffice.Models.Domain.Roots;
public class Staff
{
    public StaffId Id { get; set; }
    // public string UserId { get; set; }
    // public virtual User User { get; set; }
    public FirstName FirstName { get; set; }
    public LastName LastName { get; set; }
    //public FullName FullName { get; private set; }
    public LicenseNumber LicenseNumber { get; set; }
    public string SpecializationCode { get; set; }
    public PhoneNumber PhoneNumber { get; set; }
    public Email Email { get; set; }
    public List<TimeSlot> AvailabilitySlots { get; set; } = new List<TimeSlot>();

    public StaffStatus Status { get; set; } = StaffStatus.Active();

    public Staff()
    {
    }

    public Staff(StaffId id, FirstName firstName, LastName lastName, LicenseNumber licenseNumber, string specializationCode, Email email, PhoneNumber phoneNumber)
    {
        Id = id;
        FirstName = firstName;
        LastName = lastName;
        //FullName = new FullName(firstName, lastName);
        LicenseNumber = licenseNumber;
        SpecializationCode = specializationCode;
        PhoneNumber = phoneNumber;
        Email = email;
        //AvailabilitySlots = availabilitySlots;
        //ValidateUniqueIdentifiers();
        Status = StaffStatus.Active(); // Inicializa como ativo por padrão.
    }

    // private void ValidateUniqueIdentifiers()
    // {
    //     // Implement validation logic to ensure License Number, Email, and Phone are unique
    // }

    public bool IsAvailable(TimeOnly appointmentTime)
    {
        foreach (var slot in AvailabilitySlots)
        {
            if (slot.IsWithinSlot(appointmentTime))
            {
                return true;
            }
        }
        return false;
    }

    // public void AddAvailabilitySlot(TimeSlot slot)
    // {
    //     AvailabilitySlots.Add(slot);
    // }


    public void Deactivate()
    {
        Status = StaffStatus.Inactive(); // Altera o status para inativo.
    }

    // public string GetUserId(){
    //     return UserId;
    // }
}
