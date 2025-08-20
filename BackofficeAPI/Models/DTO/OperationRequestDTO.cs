using Azure;

namespace Backoffice.Models.DTO
{
    public class OperationRequestDTO
    {
        public long Id { get; set; }
        public string PatientId { get; set; }
        public string DoctorId { get; set; }
        public long OperationTypeId { get; set; }
        public string Priority { get; set; }
        public string Deadline { get; set; }

        public static OperationRequestDTO Default = new OperationRequestDTO
        {
            Id = 0,
            PatientId = "",
            DoctorId = "",
            OperationTypeId = 0,
            Priority = "",
            Deadline = ""
        };
    }
}