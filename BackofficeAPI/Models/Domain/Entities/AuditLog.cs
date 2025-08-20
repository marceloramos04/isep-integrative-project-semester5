namespace Backoffice.Models.Domain.Entities
{
    public class AuditLog
    {
        public int Id { get; set; }
        public int PatientId { get; set; }
        public string ChangeDescription { get; set; }
        public DateTime ChangeDate { get; set; }
    }
}