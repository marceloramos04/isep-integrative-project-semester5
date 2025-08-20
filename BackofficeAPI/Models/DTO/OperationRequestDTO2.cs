using Azure;

namespace Backoffice.Models.DTO
{
    public class OperationRequestDTO2
    {
        public long Id { get; set; }
        public string PatientId { get; set; }
        public string PatientName { get; set; }
        public long OperationTypeId { get; set; }
        public string OperationTypeName { get; set; }
        public string Priority { get; set; }
        public string Status { get; set; }
        public string Deadline { get; set; }

        public OperationRequestDTO2 () {
            PatientId="";
            PatientName = "";
            OperationTypeName = "";
            Priority = "";
            Status = "";
            Deadline = "";
        }
    }
}