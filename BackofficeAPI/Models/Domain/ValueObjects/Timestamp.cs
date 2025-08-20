namespace Backoffice.Models.Domain.ValueObjects
{
    public class Timestamp
    {
        public DateTime Value { get; set; }

        public Timestamp(DateTime value)
        {
            Value = value;
        }

        // public override bool Equals(object? obj)
        // {
        //     if (obj is Timestamp other)
        //     {
        //         return Value == other.Value;
        //     }

        //     return false;
        // }

        // public override int GetHashCode()
        // {
        //     return Value.GetHashCode();
        // }
    }
}