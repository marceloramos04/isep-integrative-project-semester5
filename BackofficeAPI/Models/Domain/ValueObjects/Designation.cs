namespace Backoffice.Models.Domain.ValueObjects;

using System.Text.RegularExpressions;

public class Designation
{
    public string Value { get; set; }
    private const string PATTERN= "^[ a-zA-Z0-9]*$";
    public Designation(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
           throw new Exception("Designation can't be null or empty");
        }
        if (!CheckFormat(value))
        {
           throw new Exception("Invalid Designation format");
        }

         Value = value;
    }

    private bool CheckFormat(string value)
    {
        return Regex.IsMatch(value, PATTERN);
    }
}