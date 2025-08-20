namespace Backoffice.Models.DTO
{
    public class AppointmentDTO
    {
        public long? Id { get; set; }
        //public string PatientId { get; set; }
        public long RequestId { get; set; }
        public string RoomId { get; set; }
        public string Status { get; set; }
        public string Timestamp { get; set; }
    }
}