namespace Backoffice.Models.Domain.ValueObjects
{
    public class RoomStatus
    {
        public string Value { get; set;}

        public RoomStatus(string value)
        {
            Value = value;
        }
    }
}