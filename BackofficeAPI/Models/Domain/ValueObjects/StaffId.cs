namespace Backoffice.Models.Domain.ValueObjects;

using System.Text.RegularExpressions;
using System;

public class StaffId : IComparable<StaffId>
{

    public string Value { get; set; }
    private const string ID_PATTERN = @"^[DNO]\d{4}\d{5}$";
    private const string SEQUENTIAL_NUMBER_PATTERN = @"^\d{5}$";

    public StaffId(){
        Value = "";
    }

    public StaffId(string id)
    {
        if (!CheckId(id))
        {
            throw new ArgumentException("ID invalid");
        }
        Value = id;
    }

    // public StaffId(Role role, DateTime date, string sequentialNumber)
    // {
    //     Value = GenerateId(role, date, sequentialNumber);
    // }

    private static bool CheckId(string id)
    {
        return Regex.IsMatch(id, ID_PATTERN);
    }

    private static bool CheckSequentialNumber(string sequentialNumber)
    {
        return Regex.IsMatch(sequentialNumber, SEQUENTIAL_NUMBER_PATTERN);
    }


    // must be tested
    public static StaffId GenerateId(Role role, DateTime date, string sequentialNumber)
    {
        if (!CheckSequentialNumber(sequentialNumber))
        {
            throw new ArgumentException("Sequential number invalid");
        }

        string prefix;

        switch (role.Name)
        {
            case Role.DOCTOR:
                prefix = "D";
                break;
            case Role.NURSE:
                prefix = "N";
                break;
            default:
                prefix = "O";
                break;
        }

        return new StaffId(prefix + date.Year.ToString() + sequentialNumber);
    }

    public int CompareTo(StaffId other)
    {
        if (other == null) return 1;
        return string.Compare(Value, other.Value, StringComparison.Ordinal);
    }

    public override bool Equals(object? obj)
    {
        if (obj is StaffId other)
        {
            return Value == other.Value;
        }

        return false;
    }
}

