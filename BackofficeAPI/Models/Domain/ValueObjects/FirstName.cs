using System;

namespace Backoffice.Models.Domain.ValueObjects
{
    public class FirstName
    {
        public string Value { get; set;}

        public FirstName(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new ArgumentException("First name cannot be empty or whitespace.", nameof(value));
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