using Backoffice.Models.Domain.Roots;
using Backoffice.Models.DTO;
using Backoffice.Models.Domain.ValueObjects;
using System;

namespace Backoffice.Models.Mappers;

public class StaffDTOMapper{

    public static StaffDTO domainToDTO (Staff staff){
        StaffDTO dto = new StaffDTO{
            Id = staff.Id.Value,
            FirstName = staff.FirstName.Value,
            LastName = staff.LastName.Value,
            LicenseNumber = staff.LicenseNumber.Value,
            SpecializationCode = staff.SpecializationCode,
            Email = staff.Email.Address,
            PhoneNumber = staff.PhoneNumber.Number,
            StaffStatus = staff.Status.IsActive ? "Active" : "Inactive"
        };

        foreach (TimeSlot slot in staff.AvailabilitySlots){
            dto.AvailabilitySlots.Add(TimeSlotMapper.domainToDto(slot));
        }

        return dto;

    }

}