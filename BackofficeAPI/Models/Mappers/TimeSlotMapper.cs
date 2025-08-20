using Backoffice.Models.DTO;
using Backoffice.Models.Domain.ValueObjects;

namespace Backoffice.Models.Mappers
{
    public class TimeSlotMapper
    {
        public static TimeSlotDTO domainToDto(TimeSlot slot)
        {
            TimeSlotDTO dto = new TimeSlotDTO
            {
                Start = slot.Start.ToString(),
                End = slot.End.ToString()
            };

            return dto;
        }

        public static TimeSlot dtoToDomain(TimeSlotDTO dto)
        {
            TimeSlot domain = new TimeSlot(TimeOnly.Parse(dto.Start), TimeOnly.Parse(dto.End));

            return domain;
        }
    }
}