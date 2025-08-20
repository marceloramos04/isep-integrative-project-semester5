using System;

namespace Backoffice.Models.Domain.ValueObjects
{
    public class Username
    {
        public string Value { get; private set; }

        public Username(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new ArgumentException("Username cannot be empty.", nameof(value));
            }

            Value = value;
        }

        public override string ToString()
        {
            return Value;
        }



        public override int GetHashCode()
        {
            return Value.GetHashCode();
        }
    }
}