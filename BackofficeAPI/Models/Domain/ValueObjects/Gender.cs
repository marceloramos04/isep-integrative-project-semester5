namespace Backoffice.Models.Domain.ValueObjects
{
    public class Gender
    {
        public string Value { get; set; }

        public Gender(string value)
        {
            Value = value;
        }

        public static Gender Male => new Gender("Male");
        public static Gender Female => new Gender("Female");
        public static Gender Other => new Gender("Other");
        public static Gender FromString(string value)
        {
            return value switch
            {
                "Male" => Male,
                "Female" => Female,
                "Other" => Other,
                _ => throw new ArgumentException("Invalid gender value.")
            };
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