namespace Backoffice.Models.Domain.ValueObjects
{
    public class RoomCapacity
    {
        public int Value { get; set; }

        public RoomCapacity(int value)
        {
            Value = value;
        }
    }
}