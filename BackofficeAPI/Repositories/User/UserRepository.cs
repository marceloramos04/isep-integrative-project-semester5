namespace Backoffice.Repositories.User;

using Backoffice.Models;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.Entities;
using Backoffice.Models.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

public class UserRepository : IUserRepository {

    private BackofficeContext _context;

    public UserRepository(BackofficeContext context){
        _context=context;
    }

    public void Add(User user)
    {
        _context.Users.Add(user);
    }

    public async Task<User> GetByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<User> GetByUsernameAsync(string username)
    {
        return await _context.Users.FirstOrDefaultAsync(user => user.Username.Value == username);
    }

    public async Task<User> getByEmailAsync(string email){
        return await _context.Users.Where(u=>u.Email.Address == email).FirstOrDefaultAsync();
    }
}