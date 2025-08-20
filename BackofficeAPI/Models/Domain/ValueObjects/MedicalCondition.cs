using System;

namespace Backoffice.Models.Domain.ValueObjects
{
    public class MedicalCondition
    {
        public string Name { get; private set; }
        public string Description { get; private set; }

        public MedicalCondition(string name, string description)
        {
            if (string.IsNullOrWhiteSpace(name))
                throw new ArgumentException("Name cannot be empty.", nameof(name));
            if (string.IsNullOrWhiteSpace(description))
                throw new ArgumentException("Description cannot be empty.", nameof(description));

            Name = name;
            Description = description;
        }
        public override int GetHashCode()
        {
            return HashCode.Combine(Name, Description);
        }
    }
}