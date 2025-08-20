using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.Domain.Entities;

namespace Backoffice.Models.Domain.Roots;

public class SurgeryRoom{
    
    public RoomNumber Id { get; set; }
    public RoomStatus Status { get; set; }
    public List<Equipment> AssignedEquipment { get; set; } = new List<Equipment>();
    public RoomType Type { get; set; }
    public RoomCapacity Capacity { get; set; }
    //public virtual List<Appointment> Appointments { get; set; }

    public SurgeryRoom(){}

    public SurgeryRoom(RoomNumber id, RoomStatus status, RoomType type, RoomCapacity capacity)
    {
        Id = id;
        Status = status;
        Type = type;
        Capacity = capacity;
    }

    public override bool Equals(object? obj)
    {
        if (obj is SurgeryRoom surgeryRoom)
        {
            return Id == surgeryRoom.Id;
        }

        return false;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Id);
    }
}