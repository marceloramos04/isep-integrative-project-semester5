namespace Backoffice.Models.Domain.ValueObjects;

public class AppointmentStatus{

    public string Value { get; set; }

    public AppointmentStatus(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            throw new ArgumentException("Value cannot be null or whitespace.", nameof(value));
        }

        Value = value;
    }
}