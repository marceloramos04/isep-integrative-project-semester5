using System;

namespace Backoffice.Models.Domain.ValueObjects
{
    public class DateOfBirth
    {
        public DateTime Value { get; set; }

        public DateOfBirth(DateTime value)
        {
            if (value > DateTime.Now)
                throw new ArgumentException("Date of birth cannot be in the future.");

            Value = value;
        }

        public override int GetHashCode()
        {
            return Value.GetHashCode();
        }

        public override string ToString()
        {
            return Value.ToShortDateString();
        }
    }
}