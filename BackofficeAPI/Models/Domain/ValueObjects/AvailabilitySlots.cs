using System;
using System.Collections.Generic;

namespace Backoffice.Models.Domain.ValueObjects
{
    public class AvailabilitySlots
    {
        public List<TimeSlot> Slots { get; private set; }

        public AvailabilitySlots(List<TimeSlot> slots)
        {
            Slots = slots ?? throw new ArgumentNullException(nameof(slots));
        }

        public void AddSlot(TimeSlot slot)
        {
            if (slot == null)
                throw new ArgumentNullException(nameof(slot));

            Slots.Add(slot);
        }

        public void RemoveSlot(TimeSlot slot)
        {
            if (slot == null)
                throw new ArgumentNullException(nameof(slot));

            Slots.Remove(slot);
        }
    }

}