using Backoffice.Models;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backoffice.Repositories.User;
using System.Net;
using System.Net.Mail;
using Backoffice.Models.Domain.ValueObjects;

namespace Backoffice.Services
{
    public class UserService
    {
        private readonly BackofficeContext _context;
        private readonly UserRepository _userRepository;


        public UserService(BackofficeContext context)
        {
            _context = context;
            _userRepository = new UserRepository(context);
        }

        public void Add(User user)
        {
            _context.Users.Add(user);
        }

        public async Task<List<User>> GetUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> FindAsync(long id)
        {
            var user = await _context.Users.FindAsync(id) ?? throw new KeyNotFoundException($"User with ID {id} not found.");
            return user;
        }

        public async Task<User> FindByEmailAsync(Email email) // Novo método para buscar por email
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email.Address == email.Address);
        }

        public void Add(string username, string role, string email)
        {
            var user = new User(username,
                                role,
                                email);

            _context.Users.Add(user);
        }

        public void Remove(User user)
        {
            _context.Users.Remove(user);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }





        //Register user
        public async Task RegisterUserAsync(User user)
        {
            if (user is null)
            {
                throw new ArgumentNullException(nameof(user), "User cannot be null.");
            }

            var email = user.Email.Address;
            var existingUser = await _userRepository.getByEmailAsync(email);

            if (existingUser != null)
            {
                throw new UserAlreadyExistsException("A user with the same email already exists.");
            }
            else
            {

                try
                {
                    ValidateUser(user);

                    _userRepository.Add(user);

                    await SaveChangesAsync();

                    //  await SendSetupEmailAsync(user);
                }
                catch (Exception ex)
                {
                    throw new UserRegistrationException("Failed to register the user");
                }
            }
        }



        private void ValidateUser(User user)
        {
            if (string.IsNullOrWhiteSpace(user.Username.Value))
            {
                throw new ArgumentException("Username cannot be null or empty.");
            }

            if (string.IsNullOrWhiteSpace(user.Email.Address) || !user.Email.Address.Contains("@"))
            {
                throw new ArgumentException("Invalid email address.");
            }

            if (_context.Users.Any(u => u.Username == user.Username))
            {
                throw new ArgumentException("Username already exists.");
            }

            if (_context.Users.Any(u => u.Email == user.Email))
            {
                throw new ArgumentException("Email already in use.");
            }

        }

        private async Task SendSetupEmailAsync(User user)
        {
            // Defina as informações do servidor SMTP
            var smtpClient = new SmtpClient("smtp.example.com") // Substitua pelo servidor SMTP
            {
                Port = 587, // Ou a porta do seu servidor SMTP
                Credentials = new NetworkCredential("your_email@example.com", "your_password"), // Seu e-mail e senha
                EnableSsl = true, // Ativar SSL se necessário
            };

            // Criação da mensagem de e-mail
            var mailMessage = new MailMessage
            {
                From = new MailAddress("your_email@example.com"), // Seu e-mail
                Subject = "Setup Your Account",
                Body = $"Hello {user.Username.Value},\n\nPlease set up your account by clicking the link below:\n\n{GenerateSetupLink(user)}", // Gere o link de configuração
                IsBodyHtml = false, // Se o corpo do e-mail for HTML, defina como true
            };

            mailMessage.To.Add(user.Email.Address);

            await smtpClient.SendMailAsync(mailMessage);
        }

        private string GenerateSetupLink(User user)
        {
            // Gere um link único para configuração (por exemplo, usando um token ou um GUID)
            // Aqui você pode construir a URL de acordo com a estrutura do seu aplicativo
            return $"https://yourapp.com/setup?userId={user.Id}"; // Substitua pelo formato adequado
        }

        public class UserAlreadyExistsException : Exception
        {
            public UserAlreadyExistsException(string message) : base(message)
            {
            }
        }

        public class UserRegistrationException : Exception
        {
            public UserRegistrationException(string message) : base(message)
            {
            }
        }
    }
}


