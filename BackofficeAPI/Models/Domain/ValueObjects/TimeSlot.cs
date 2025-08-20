using System;
using Backoffice.Models.Domain.Entities;
using Backoffice.Models.Domain.Roots;

namespace Backoffice.Models.Domain.ValueObjects
{
    public class TimeSlot
    {
        public TimeOnly Start { get; set; }
        public TimeOnly End { get; set; }

        public TimeSlot()
        {
        }

        public TimeSlot(TimeOnly start, TimeOnly end)
        {
            if (end <= start)
                throw new ArgumentException("End time must be after start time");

            Start = start;
            End = end;
        }

        internal bool IsWithinSlot(TimeOnly appointmentTime)
        {
            return appointmentTime >= Start && appointmentTime <= End;
        }
    }
}
