using Backoffice.Models.Domain.ValueObjects;

namespace Backoffice.Models.Domain.Roots;

public class OperationRequest{

    public long Id { get; set; }  

    public MedicalRecordNumber PatientId { get; set; }
    public virtual Patient Patient { get; set; }

    public StaffId DoctorId { get; set; }
    public virtual Staff Doctor { get; set; }

    public long OperationTypeId { get; set; }
    public virtual OperationType OperationType { get; set; }

    public Priority Priority { get; set; }
    public Deadline Deadline { get; set; }
    //public virtual Appointment Appointment { get; set; }

    public OperationRequest(MedicalRecordNumber patientId, StaffId doctorId, long operationTypeId, Priority priority, Deadline deadline)
    {
        PatientId = patientId;
        DoctorId = doctorId;
        OperationTypeId = operationTypeId;
        Priority = priority;
        Deadline = deadline;
    }

    public override bool Equals(object? obj)
    {
        if (obj is OperationRequest other)
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