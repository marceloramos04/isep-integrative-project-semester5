using Backoffice.Models;
using Backoffice.Models.Domain.Roots;
using Humanizer;
using Microsoft.EntityFrameworkCore;

namespace Backoffice.Repositories;

public class OperationTypeRepository {

    private readonly BackofficeContext _context;
    public async Task AddOperationType(OperationType operationType)
    {
        _context.OperationTypes.Add(operationType);
        await _context.SaveChangesAsync();
    }

    public bool IsOperationNameExists(string operationName)
    {
        return _context.OperationTypes.Any(ot => ot.Name.Value.Equals(operationName, StringComparison.OrdinalIgnoreCase));
    }

    public OperationTypeRepository(BackofficeContext context){
        _context=context;
    }

    public async Task<List<OperationType>> GetOperationTypes(){
        return await _context.OperationTypes.ToListAsync();
    }

    public async Task<List<OperationType>> SearchOperationTypes(
        string typeName,
        string specialization,
        string status
    )
    {
        var query = _context.OperationTypes.Select(ot => ot);
        if (!string.IsNullOrWhiteSpace(typeName))
        {
            query = query.Where(ot => ot.Name.Value.Trim().ToLower().Contains(typeName.Trim().ToLower()));
        }
        if (!string.IsNullOrWhiteSpace(specialization))
        {
            query = query.Where(ot => ot.RequiredStaff.Any(
                requiredStaff => requiredStaff.Specialization.Designation.Trim().ToLower()==specialization.Trim().ToLower()
            ));
        }
        if (!string.IsNullOrWhiteSpace(status))
        {
            query = query.Where(ot => ot.status == status);
        }
        
        return await query.ToListAsync();
    }

    public async Task<OperationType> GetOperationTypeById(long id){
        return await _context.OperationTypes.FindAsync(id);
    }
}