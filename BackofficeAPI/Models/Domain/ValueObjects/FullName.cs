using System;

namespace Backoffice.Models.Domain.ValueObjects
{

    public class FullName
    {
        public FirstName FirstName { get; }
        public LastName LastName { get; }

        public FullName(FirstName firstName, LastName lastName)
        {
            FirstName = firstName ?? throw new ArgumentNullException(nameof(firstName));
            LastName = lastName ?? throw new ArgumentNullException(nameof(lastName));
        }

        public override string ToString()
        {
            return $"{FirstName.Value} {LastName.Value}";
        }
    }
}