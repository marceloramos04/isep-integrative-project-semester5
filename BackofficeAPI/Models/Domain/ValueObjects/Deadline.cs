namespace Backoffice.Models.Domain.ValueObjects
{
    public class Deadline
    {
        public DateTime Value { get; set; }

        public Deadline(DateTime value)
        {
            Value = value;
        }
    }
}