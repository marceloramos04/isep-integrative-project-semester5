using Backoffice.Models.Domain.ValueObjects;

namespace Backoffice.Models.DTO
{
    public class ResetPasswordDTO
    {
        public required Email Email { get; set; }
        public required string Token { get; set; }
        public required string NewPassword { get; set; }
    }
}
