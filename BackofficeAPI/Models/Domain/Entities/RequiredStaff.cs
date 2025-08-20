using Backoffice.Models.Domain.ValueObjects;

namespace Backoffice.Models.Domain.Entities
{
    public class RequiredStaff
    {
        public Role Role { get; set; }
        public Specialization Specialization { get; set; }
        public int Quantity { get; set; }

        public RequiredStaff() {}

        public RequiredStaff(Role role, Specialization specialization, int quantity)
        {
            Role = role;
            Specialization = specialization;
            Quantity = quantity;
        }

        public override bool Equals(object? obj)
        {
            if (obj == null || obj is not RequiredStaff)
            {
                return false;
            }

            RequiredStaff other = (RequiredStaff)obj;
            return Role.Equals(other.Role) && Specialization.Equals(other.Specialization) && Quantity == other.Quantity;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Specialization, Quantity);
        }
    }
}