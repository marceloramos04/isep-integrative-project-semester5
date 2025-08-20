namespace Backoffice.Repositories.User;
using Backoffice.Models.Domain.Entities;
using System.Threading.Tasks;
using Backoffice.Models;

public class AuditLogRepository
{
    private BackofficeContext _context;

    public AuditLogRepository(BackofficeContext context)
    {
        _context = context;
    }

    public async Task AddLogAsync(AuditLog log)
    {
        _context.AuditLogs.Add(log);
        await _context.SaveChangesAsync();
    }
}