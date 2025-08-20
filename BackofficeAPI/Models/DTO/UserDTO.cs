namespace Backoffice.Models.DTO
{
    public class UserDTO
    {
        public string? id { get; set; }
        public required string userName { get; set; }
        public required string email { get; set; }
        public required string role { get; set; }
    }
}