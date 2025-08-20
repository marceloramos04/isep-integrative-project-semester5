using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.Entities;

namespace Backoffice.Repositories.User;

public interface IUserRepository{

    public Task<Models.Domain.Roots.User> getByEmailAsync(string email);
}