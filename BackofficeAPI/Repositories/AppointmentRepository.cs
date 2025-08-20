using Backoffice.Models;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.Entities;

namespace Backoffice.Repositories;

public class AppointmentRepository{

    private BackofficeContext _context;

    public AppointmentRepository(BackofficeContext context){
        _context=context;
    }

    public bool isScheduled(long requestId){
        return _context.Appointments.Any(a => a.RequestId == requestId);
    }
}