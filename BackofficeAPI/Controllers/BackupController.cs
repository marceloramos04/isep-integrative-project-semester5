
using Microsoft.AspNetCore.Mvc;
using Backoffice.Services;
using Backoffice.Models;


namespace BackofficeAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BackupController : ControllerBase
{
    private readonly BackofficeContext _backofficeContext;
    private readonly BackupService _backupService;

    public BackupController(BackofficeContext backofficeContext)
    {
        _backofficeContext = backofficeContext;
        _backupService = new BackupService(backofficeContext);

    }

    [HttpPost("backup")]
    public async Task<IActionResult> BackupDatabase()
    {
        await _backupService.BackupInMemoryDatabaseAsync("Backups");
        return Ok("Backup completed successfully.");
    }

    [HttpPost("restore")]
    public async Task<IActionResult> RestoreDatabase()
    {
        await _backupService.RestoreInMemoryDatabaseAsync("Backups");
        return Ok("Restore completed successfully.");
    }
}
