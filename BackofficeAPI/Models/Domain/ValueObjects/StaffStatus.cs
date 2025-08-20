namespace Backoffice.Models.Domain.ValueObjects
{
    public class StaffStatus
    {
        public bool IsActive { get; private set; }

        public StaffStatus(bool isActive)
        {
            IsActive = isActive;
        }

        // Método para criar um StaffStatus ativo
        public static StaffStatus Active()
        {
            return new StaffStatus(true);
        }

        // Método para criar um StaffStatus inativo
        public static StaffStatus Inactive()
        {
            return new StaffStatus(false);
        }

        // Comparação entre valores (caso necessário)
        public override bool Equals(object obj)
        {
            if (obj is StaffStatus other)
            {
                return other.IsActive == IsActive;
            }

            return false;
        }

        public override int GetHashCode()
        {
            return IsActive.GetHashCode();
        }
    }
}
