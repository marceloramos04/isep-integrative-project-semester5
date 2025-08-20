using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.Domain.Roots;

namespace Backoffice.Models.Domain.Entities
{
    public class Equipment
    {
        public int Id { get; set; }
        public Designation Name { get; set; }
        
        public virtual List<SurgeryRoom> rooms { get; set; } = new List<SurgeryRoom>();
        
        public Equipment(Designation name)
        {
            Name = name;
        }
    }
}