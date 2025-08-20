using System;

namespace Backoffice.Models.Domain.ValueObjects
{
    public class Priority
    {
        public string Value { get; set; }
        public const string ELECTIVE = "Elective";
        public const string URGENT = "Urgent";
        public const string EMERGENCY = "Emergency";
        public static List<string> priorities = new List<string>
        {
            ELECTIVE,
            URGENT,
            EMERGENCY
        };

        public Priority(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new ArgumentException("Priority value cannot be null or empty.", nameof(value));
            }

            Value = value;
        }

        public bool IsHigherPriorityThan(Priority other)
        {
            if (other == null)
            {
                throw new ArgumentNullException(nameof(other));
            }

            return Value.Trim().ToLower() == other.Value.Trim().ToLower();
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Value);
        }

        public override string ToString()
        {
            return $"Priority: {Value}";
        }
    }
}