using Backoffice.Models.Domain.ValueObjects;

namespace Backoffice.Models.Domain.Roots
{
    public class Appointment
    {
        public long Id { get; set; }

        // public MedicalRecordNumber PatientId { get; set; }
        // public virtual Patient Patient { get; set; }

        public long RequestId { get; set; }
        public virtual OperationRequest OperationRequest { get; set; }
        
        public RoomNumber RoomId { get; set; }
        public virtual SurgeryRoom Room { get; set; }

        public AppointmentStatus Status { get; set; }
        public Timestamp Timestamp { get; set; }
        

        public Appointment(long requestId, RoomNumber roomId, AppointmentStatus status, Timestamp timestamp)
        {
            RequestId = requestId;
            Status = status;
            Timestamp = timestamp;
            RoomId = roomId;
        }


        public override bool Equals(object? obj)
        {
            if (obj is Appointment other)
            {
                return Id == other.Id;
            }

            return false;
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }
}