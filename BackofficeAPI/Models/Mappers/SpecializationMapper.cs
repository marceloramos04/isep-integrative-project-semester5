using BackofficeAPI.Models.DTO;
using Backoffice.Models.Domain.ValueObjects;

namespace BackofficeAPI.Models.Mappers
{
    public static class SpecializationMapper
    {
        public static SpecializationDTO ToDTO(Specialization specialization)
        {
            if (specialization == null)
            {
                return null;
            }

            return new SpecializationDTO
            {
                SpecializationCode = specialization.SpecializationCode,
                Designation = specialization.Designation,
                Description = specialization.Description
            };
        }

        public static Specialization ToDomain(SpecializationDTO specializationDTO)
        {
            if (specializationDTO == null)
            {
                return null;
            }

            return new Specialization
            {
                SpecializationCode = specializationDTO.SpecializationCode,
                Designation = specializationDTO.Designation,
                Description = specializationDTO.Description
            };
        }
    }
}