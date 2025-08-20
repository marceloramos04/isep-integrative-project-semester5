using Backoffice.Models.Domain.Roots;
using Backoffice.Models.DTO;

namespace Models.Mappers;
public class UserDataMapper
{
    public User MapToDomain(UserDTO dto)
    {
        return new User(
            dto.userName,
            dto.role,
            dto.email
        );
    }

    public UserDTO MapToData(User user)
    {
        return new UserDTO
        {
            userName = user.Username.Value,
            email = user.Email.Address,
            role = user.Role.Name
        };
    }
}
