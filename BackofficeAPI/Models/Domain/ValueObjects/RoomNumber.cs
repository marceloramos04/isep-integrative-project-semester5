namespace Backoffice.Models.Domain.ValueObjects
{
    public class RoomNumber
    {
        public string Value { get; set; }

        public RoomNumber(string value)
        {
            Value = value;
        }

        public override bool Equals(object? obj)
        {
            if (obj is RoomNumber roomNumber)
            {
                return Value == roomNumber.Value;
            }

            return false;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Value);
        }
    }
}