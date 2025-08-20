using System;
using System.Collections.Generic;

namespace Backoffice.Models.Domain.ValueObjects
{
    public class LicenseNumber
    {
        public string Value { get; set;}

        public LicenseNumber(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new ArgumentException("License number cannot be null or empty.", nameof(value));
            }

            Value = value;
        }


        public override int GetHashCode()
        {
            return HashCode.Combine(Value);
        }

        public override string ToString()
        {
            return Value;
        }

    }
}