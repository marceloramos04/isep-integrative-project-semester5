using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace Backoffice.Services
{
    public interface IEmailSender
    {
        Task SendEmailAsync(string email, string subject, string message);
        Task SendVerificationEmailAsync(string email, string verificationToken); // Adiciona a interface
    }

    public class EmailService : IEmailSender
    {
        private readonly string _emailAddress = "us@isep.ipp.pt"; // Coloque seu email aqui
        private readonly string _password = "Test123456"; // Coloque sua senha aqui
        private readonly string _smtpHost = "smtp-mail.outlook.com"; // Servidor SMTP

        public Task SendEmailAsync(string email, string subject, string message)
        {
            return SendEmail(email, subject, message);
        }

        public Task SendVerificationEmailAsync(string email, string verificationToken)
        {
            var subject = "Verifique seu email";
            var message = $"Por favor, verifique seu email clicando no seguinte link: https://yourapp.com/verify-email?token={verificationToken}";
            return SendEmail(email, subject, message);
        }

        private Task SendEmail(string email, string subject, string message)
        {
            var client = new SmtpClient(_smtpHost, 587)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(_emailAddress, _password)
            };

            return client.SendMailAsync(new MailMessage(from: _emailAddress, to: email, subject, message));
        }
    }
}
