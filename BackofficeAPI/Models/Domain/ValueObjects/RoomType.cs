namespace Backoffice.Models.Domain.ValueObjects
{
    public class RoomType
    {
        public string Value { get; set; }

        public RoomType(string value)
        {
            Value = value;
        }
    }
}