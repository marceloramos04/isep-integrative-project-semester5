
namespace Backoffice.Models.Domain.ValueObjects
{
    public class Specialization
    {

        public string SpecializationCode { get; set; }
        public string Designation { get; set; }
        public string? Description { get; set; }

        public Specialization() { }

        public Specialization(string specializationCode, string designation, string? description)
        {
            this.SpecializationCode = specializationCode;
            this.Designation = designation;
            this.Description = description;
        }



        public override bool Equals(object? obj)
        {
            if (obj is Specialization other)
            {
                return SpecializationCode == other.SpecializationCode;
            }
            return false;
        }

        public override int GetHashCode()
        {
            return SpecializationCode.GetHashCode();
        }
    }
}
