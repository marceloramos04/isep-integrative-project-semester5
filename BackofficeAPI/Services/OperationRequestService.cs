using Backoffice.Models.DTO;
using Backoffice.Models;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.Entities;
using Backoffice.Repositories;

namespace Backoffice.Services;

public class OperationRequestService
{

    private readonly OperationRequestRepository _requests;
    private readonly AppointmentRepository _appointments;

    public OperationRequestService(BackofficeContext context)
    {
        _requests = new OperationRequestRepository(context);
        _appointments = new AppointmentRepository(context);
    }

    public List<OperationRequestDTO2> GetFilteredOperationRequests(
        string staffId,
        string? patientFirstName,
        string? patientLastName,
        string? priority,
        long? operationTypeId,
        string? status
    )
    {
        var query = _requests.GetFilteredRequests(
            staffId,
            patientFirstName,
            patientLastName,
            priority,
            operationTypeId
        );

        if (!string.IsNullOrEmpty(status))
        {
            if (Utils.CompareStrings(status, OperationRequestRepository.SCHEDULED_STATUS) == 0)
            {
                query = query.Where(r => _appointments.isScheduled(r.Id));
            }
            else query = query.Where(r => !_appointments.isScheduled(r.Id));
        }

        return query.Select(r => new OperationRequestDTO2
        {
            Id = r.Id,
            PatientId = r.Patient.MedicalRecordNumber.Value,
            PatientName = r.Patient.FirstName.Value + " " + r.Patient.LastName.Value,
            OperationTypeId = r.OperationType.Id,
            OperationTypeName = r.OperationType.Name.Value,
            Priority = r.Priority.Value,
            Status = (status == null) ? (_appointments.isScheduled(r.Id) ? OperationRequestRepository.SCHEDULED_STATUS : OperationRequestRepository.WAITING_STATUS) : status,
            Deadline = r.Deadline.Value.ToString("dd-MM-yyyy"),
        }).ToList();
    }

    public List<string> GetRequestStatuses()
    {
        return _requests.GetRequestStatuses();
    }

    public List<string> GetPriorities()
    {
        return _requests.GetPriorities();
    }

    public OperationRequestDTO2 GetRequestById(long id)
    {
        return _requests.GetRequestById(id).Select(
            r => new OperationRequestDTO2
            {
                Id = r.Id,
                PatientId = r.Patient.MedicalRecordNumber.Value,
                PatientName = r.Patient.FirstName.Value + " " + r.Patient.LastName.Value,
                OperationTypeId = r.OperationType.Id,
                OperationTypeName = r.OperationType.Name.Value,
                Priority = r.Priority.Value,
                Status = _appointments.isScheduled(r.Id) ? OperationRequestRepository.SCHEDULED_STATUS : OperationRequestRepository.WAITING_STATUS,
                Deadline = r.Deadline.Value.ToString("yyyy-MM-dd"),
            }).FirstOrDefault();

    }
}