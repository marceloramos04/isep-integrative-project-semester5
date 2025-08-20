using Backoffice.Models;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.Entities;
using Backoffice.Models.DTO;
using Backoffice.Models.Domain.ValueObjects;

namespace Backoffice.Repositories;

public class OperationRequestRepository
{

    private BackofficeContext _context;
    public const string SCHEDULED_STATUS = "Scheduled";
    public const string WAITING_STATUS = "Waiting";
    public static List<string> requestStatuses = new List<string>{
        SCHEDULED_STATUS, 
        WAITING_STATUS
    };


public OperationRequestRepository(BackofficeContext context)
{
    _context = context;
}

public IQueryable<OperationRequest> GetFilteredRequests(
    string staffId,
    string? patientFirstName,
    string? patientLastName,
    string? priority,
    long? operationTypeId
)
{
    var query = _context.OperationRequests.Where(r => r.DoctorId.Value == staffId);

    if (!string.IsNullOrEmpty(patientFirstName))
    {
        query = query.Where(r => r.Patient.FirstName.Value.Trim().ToLower().Contains(patientFirstName.Trim().ToLower()));
    }

    if (!string.IsNullOrEmpty(patientLastName))
    {
        query = query.Where(r => r.Patient.LastName.Value.Trim().ToLower().Contains(patientLastName.Trim().ToLower()));
    }

    if (!string.IsNullOrEmpty(priority))
    {
        query = query.Where(r => Utils.CompareStrings(r.Priority.Value, priority) == 0);
    }

    if (operationTypeId > 0)
    {
        // query = query.Where(r => Utils.CompareStrings(r.OperationType.Name.Value, operationType) == 0);
        query = query.Where(r => r.OperationTypeId == operationTypeId);
    }

    return query;
}

    public List<string> GetRequestStatuses(){
        return requestStatuses;
    }

    public List<string> GetPriorities(){
        return Priority.priorities;
    }

    public IQueryable<OperationRequest> GetRequestById(long id){
        return _context.OperationRequests.Where(r => r.Id == id);
    }
}