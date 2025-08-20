using Microsoft.AspNetCore.Mvc;
using Backoffice.Models.DTO;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.Entities;
using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Services; // Importando o serviço de email
using System.Net.Mail; // Para enviar email
using System.Security.Cryptography; // Para gerar senhas


namespace Backoffice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        //   private readonly EmailService _emailService;


        public UserController(UserService userService/*, EmailService emailService*/)
        {
            _userService = userService;
            // this._emailService = emailService;
        }

        // GET: api/user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _userService.GetUsersAsync();
        }

        // GET: api/user/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(long id)
        {
            var user = await _userService.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/user
        [HttpPost]
        public async Task<ActionResult<User>> CreateUser(UserDTO userDto)
        {
            // Validações dos dados do usuário
            if (string.IsNullOrWhiteSpace(userDto.userName) ||
                string.IsNullOrWhiteSpace(userDto.email) ||
                !IsValidEmail(userDto.email))
            {
                return BadRequest("Dados do usuário inválidos.");
            }
            try
            {
                // Criar novo usuário
                var user = new User(userDto.userName, userDto.role, userDto.email);
                _userService.Add(user);
                await _userService.SaveChangesAsync();
                var receiver = user.Email.Address;
                var subject = "Crie sua conta";
                var message = "";

                // await _emailService.SendEmailAsync(receiver, subject, message);

                return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro interno: {ex.Message}");

            }


        }

        // PUT: api/user/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(long id, UserDTO userDto)
        {
            var user = await _userService.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.Username = new Username(userDto.userName);
            user.Role = new Role(userDto.role);
            user.Email = new Email(userDto.email);

            await _userService.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/user/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            var user = await _userService.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _userService.Remove(user);
            await _userService.SaveChangesAsync();

            return NoContent();
        }


        private string GenerateSetupLink()
        {
            var token = Guid.NewGuid().ToString();


            return $"http://example.com/setup?token={token}";
        }



        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        // POST: api/user/reset-password
        /* [HttpPost("reset-password")]
         public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordDTO resetPasswordDTO)
         {
             if (resetPasswordDTO == null || resetPasswordDTO.Email == null || string.IsNullOrWhiteSpace(resetPasswordDTO.Token) || string.IsNullOrWhiteSpace(resetPasswordDTO.NewPassword))
             {
                 return BadRequest("Dados de redefinição de senha inválidos.");
             }

             // Verificar se o usuário existe
             var user = await _userService.FindByEmailAsync(resetPasswordDTO.Email);
             if (user == null)
             {
                 return NotFound("Usuário não encontrado.");
             }

             // Validar o token (a lógica de validação do token deve ser implementada)
             if (!ValidateToken(resetPasswordDTO.Token, user))
             {
                 return BadRequest("Token inválido ou expirado.");
             }

             // Redefinir a senha do usuário
             user.PasswordHash = HashPassword(resetPasswordDTO.NewPassword); // Presumindo que você tem um método para hash de senha
             await _userService.SaveChangesAsync();

             return NoContent(); // Retornar 204 No Content em caso de sucesso
         } */

        private bool ValidateToken(string token, User user)
        {
            // Implementar a lógica de validação do token
            return true; // Placeholder
        }

        private string HashPassword(string password)
        {
            // Implementar a lógica para hash de senhas
            return password; // Placeholder
        }
    }

}
