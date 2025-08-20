namespace Backoffice.Models.Domain.ValueObjects;

public class DurationInMinutes
{
    public int Value { get; set; }
    public DurationInMinutes(int value)
    {
        Value = value;
    }
}