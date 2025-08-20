using Backoffice.Models.Domain.ValueObjects;
using System.ComponentModel.DataAnnotations;

namespace Backoffice.Models.Domain.Roots
{
    public class User
    {

        public string Id { get; private set; }
        public Username Username { get; set; }
        public Role Role { get; set; }
        public Email Email { get; set; }
        public virtual UserProfile UserProfile { get; set; }
        public string? PasswordResetToken { get; private set; }
        public DateTime? PasswordResetTokenExpiry { get; private set; }
      //  public string PasswordHash { get; internal set; }

        public User(){
            Id="";
            Username=new Username("default");
            Role=new Role("default");
            Email=new Email("default@email.com");
        }

        public User(string username, string role, string email)
        {
            if(username is null)
            {
                throw new ArgumentNullException(nameof(username), "Username cannot be null.");
            }
            if (string.IsNullOrWhiteSpace(role))
            {
                throw new ArgumentException("Role cannot be null or empty.", nameof(role));
            }

            if (email is null)
            {
                throw new ArgumentNullException(nameof(email), "Email cannot be null.");
            }
            Username = new Username(username);
            Role = new Role(role);
            Email = new Email(email);
        }

        public User(Username username, Role role, Email email)
        {
            Username = username;
            Role = role;
            Email = email;
        }

        public void GeneratePasswordResetToken()
        {
            PasswordResetToken = Guid.NewGuid().ToString();
            PasswordResetTokenExpiry = DateTime.UtcNow.AddHours(24); 
        }

        public void ResetPassword(string newPassword)
        {
            
            PasswordResetToken = null;
            PasswordResetTokenExpiry = null;
        }

        public bool IsPasswordResetTokenValid(string token)
        {
            return PasswordResetToken == token && PasswordResetTokenExpiry > DateTime.UtcNow;
        }

    }
}