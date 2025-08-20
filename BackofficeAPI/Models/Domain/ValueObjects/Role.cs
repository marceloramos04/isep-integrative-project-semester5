namespace Backoffice.Models.Domain.ValueObjects;

public class Role {
    public string Name { get; set; }
    public const string ADMIN = "admin";
    public const string DOCTOR = "doctor";
    public const string NURSE = "nurse";
    public const string TECHNICIAN = "technician";
    public const string PATIENT = "patient";

    public static List<string> rolesForStaff = new List<string>{
        DOCTOR, NURSE, TECHNICIAN,
    };

    public Role() {}

    public Role(string name)
    {
        Name = name;
    }

    public static Role Admin { get; } = new Role(ADMIN);
    public static Role Doctor { get; } = new Role(DOCTOR);
    public static Role Nurse { get; } = new Role(NURSE);
    public static Role Technician { get; } = new Role(TECHNICIAN);
    public static Role Patient { get; } = new Role(PATIENT);

    public override int GetHashCode()
    {
        return Name.GetHashCode();
    }

    public override string ToString()
    {
        return Name;
    }

    public override bool Equals(object? obj)
    {
        if (obj is not Role || obj == null)
        {
            return false;
        }

        var o_role = (Role)obj;
        return Name.Equals(o_role.Name);
    }
}