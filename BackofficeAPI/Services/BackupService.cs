using Backoffice.Models; // Add this line with the correct namespace
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Backoffice.Services
{

    public class BackupService
    {
        private readonly BackofficeContext _context;

        public BackupService(BackofficeContext context)
        {
            _context = context;
        }

        public async Task BackupInMemoryDatabaseAsync(string backupDirectory)
        {
            if (!Directory.Exists(backupDirectory))
            {
                Directory.CreateDirectory(backupDirectory);
            }

            var dbSets = typeof(BackofficeContext).GetProperties()
                .Where(p => p.PropertyType.IsGenericType && p.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>));

            foreach (var dbSetProperty in dbSets)
            {
                var entityType = dbSetProperty.PropertyType.GetGenericArguments()[0];
                var dbSet = dbSetProperty.GetValue(_context);
                if (dbSet is IQueryable queryable)
                {
                    var data = await queryable.Cast<object>().ToListAsync();
                    var json = JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = true });

                    var fileName = $"{entityType.Name}_Backup.json";
                    var filePath = Path.Combine(backupDirectory, fileName);
                    await File.WriteAllTextAsync(filePath, json);

                    Console.WriteLine($"Backup of {entityType.Name} saved to {filePath}");
                }
            }
        }

        public async Task RestoreInMemoryDatabaseAsync(string backupDirectory)
        {
            if (!Directory.Exists(backupDirectory))
            {
                Console.WriteLine("Backup directory does not exist. Restore aborted.");
                return;
            }

            var dbSets = typeof(BackofficeContext).GetProperties()
                .Where(p => p.PropertyType.IsGenericType && p.PropertyType.GetGenericTypeDefinition() == typeof(DbSet<>));

            foreach (var dbSetProperty in dbSets)
            {
                var entityType = dbSetProperty.PropertyType.GetGenericArguments()[0];
                var fileName = $"{entityType.Name}_Backup.json";
                var filePath = Path.Combine(backupDirectory, fileName);

                if (File.Exists(filePath))
                {
                    var json = await File.ReadAllTextAsync(filePath);
                    var data = JsonSerializer.Deserialize(json, typeof(List<>).MakeGenericType(entityType));

                    if (data != null)
                    {
                        var dbSet = dbSetProperty.GetValue(_context);
                        if (dbSet is DbSet<object> dbSetTyped)
                        {
                            dbSetTyped.AddRange(data as IEnumerable<object>);
                        }
                    }

                    Console.WriteLine($"Data for {entityType.Name} restored from {filePath}");
                }
                else
                {
                    Console.WriteLine($"Backup file for {entityType.Name} not found at {filePath}");
                }
            }

            await _context.SaveChangesAsync();
        }

    }
}