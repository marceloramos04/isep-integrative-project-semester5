using Backoffice.Models.DataModels;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.ValueObjects;

namespace Backoffice.Models.DataMappers;

public class StaffDataMapper
{

/*    public static StaffData domainToData(Staff domain)
    {
        return new StaffData
        {
            Id = domain.Id.Value,
            FirstName = domain.FirstName.Value,
            LastName = domain.LastName.Value,
            LicenseNumber = domain.LicenseNumber.Value,
            Specialization = domain.Specialization.SpecializationCode.Code,
            PhoneNumber = domain.PhoneNumber.Number,
            Email = domain.Email.Address,
            AvailabilitySlots = domain.AvailabilitySlots
        };

    } */

   /** public static Staff dataToDomain(StaffData data)
    {
        Staff domain = new Staff(
            data.Id,
            data.FirstName,
            data.LastName,
            data.LicenseNumber,
            data.Specialization,
            data.PhoneNumber,
            data.Email);

        domain.AvailabilitySlots = data.AvailabilitySlots;

        return domain;
    } */
}