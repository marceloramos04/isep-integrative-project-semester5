using System;

namespace Backoffice.Models.Domain.ValueObjects
{
    public class LastName
    {
        public string Value { get; set;}

        public LastName(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new ArgumentException("Last name cannot be empty or whitespace.", nameof(value));
            }

            Value = value;
        }

        public override int GetHashCode()
        {
            return Value.GetHashCode();
        }

        public override string ToString()
        {
            return Value;
        }
    }
}