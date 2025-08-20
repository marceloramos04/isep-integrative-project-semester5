using Microsoft.CodeAnalysis.CSharp.Syntax;
using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.Domain.Entities;

namespace Backoffice.Models.Domain.Roots;

public class OperationType
{

    public long Id { get; set; }
    public Designation Name { get; set; }
    public List<RequiredStaff> RequiredStaff { get; set; } = new List<RequiredStaff>();
    public DurationInMinutes EstimatedDuration { get; set; }
    public string status { get; set; } = ACTIVE;

    public const string ACTIVE="Active";
    public const string INACTIVE="Inactive";
    public static List<string> Statuses = new List<string> { ACTIVE, INACTIVE };

    public OperationType() { }

    public OperationType(Designation name, DurationInMinutes estimatedDuration)
    {
        Name = name;
        EstimatedDuration = estimatedDuration;
    }

    public void AddRequiredStaff(RequiredStaff requiredStaff)
    {
        RequiredStaff.Add(requiredStaff);
    }

    public void RemoveRequiredStaff(RequiredStaff requiredStaff)
    {
        RequiredStaff.Remove(requiredStaff);
    }

    public override bool Equals(object? obj)
    {
        if (obj is OperationType)
        {
            return ((OperationType)obj).Id == this.Id;
        }

        return false;
    }

    public override int GetHashCode()
    {
        return Id.GetHashCode();
    }

}