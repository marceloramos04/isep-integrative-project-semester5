using Backoffice.Models;
using Backoffice.Models.Domain.Entities;
using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backoffice.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AppointmentController : ControllerBase
{
    private readonly BackofficeContext _context;

    public AppointmentController(BackofficeContext context)
    {
        _context = context;
    }

    // GET: api/Appointments
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppointmentDTO>>> GetAppointments()
    {
        return await _context.Appointments
            .Select(x => appointmentToDTO(x))
            .ToListAsync();
    }

    // GET: api/Appointments/5
    // <snippet_GetByID>
    [HttpGet("{id}")]
    public async Task<ActionResult<AppointmentDTO>> GetAppointment(long id)
    {
        var Appointment = await _context.Appointments.FindAsync(id);

        if (Appointment == null)
        {
            return NotFound();
        }

        return appointmentToDTO(Appointment);
    }
    // </snippet_GetByID>

    // PUT: api/Appointments/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Update>
    [HttpPut("{id}")]
    public async Task<IActionResult> PutAppointment(long id, AppointmentDTO dto)
    {
        // if (id != dto.Id)
        // {
        //     return BadRequest();
        // }

        var Appointment = await _context.Appointments.FindAsync(id);
        if (Appointment == null)
        {
            return NotFound();
        }

        //Appointment.PatientId = new MedicalRecordNumber(dto.PatientId);
        Appointment.RequestId = dto.RequestId;
        Appointment.RoomId = new RoomNumber(dto.RoomId);
        Appointment.Status = new AppointmentStatus(dto.Status);
        Appointment.Timestamp = new Timestamp(DateTime.Parse(dto.Timestamp));

        _context.Appointments.Update(Appointment);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) when (!AppointmentExists(id))
        {
            return NotFound();
        }

        return NoContent();
    }
    // </snippet_Update>

    // POST: api/Appointments
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Create>
    [HttpPost]
    public async Task<ActionResult<AppointmentDTO>> PostAppointment(AppointmentDTO dto)
    {
        OperationRequest request= await _context.OperationRequests.FindAsync(dto.RequestId);
        if (request == null)
        {
            return NotFound("Operation Request not found");
        }

        SurgeryRoom room = await _context.SurgeryRooms.FindAsync(new RoomNumber(dto.RoomId));
        if (room == null)
        {
            return NotFound("Surgery Room not found");
        }

        Appointment Appointment = new Appointment(
            dto.RequestId, 
            new RoomNumber(dto.RoomId), 
            new AppointmentStatus(dto.Status), 
            new Timestamp(DateTime.Parse(dto.Timestamp)));

        _context.Appointments.Add(Appointment);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetAppointment),
            new { id = Appointment.Id },
            appointmentToDTO(Appointment));
    }
    // </snippet_Create>

    // DELETE: api/Appointments/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteAppointment(long id)
    {
        var Appointment = await _context.Appointments.FindAsync(id);
        if (Appointment == null)
        {
            return NotFound();
        }

        _context.Appointments.Remove(Appointment);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool AppointmentExists(long id)
    {
        return _context.Appointments.Any(e => e.Id == id);
    }

    private static AppointmentDTO appointmentToDTO(Appointment Appointment) =>
       new AppointmentDTO
       {
           Id = Appointment.Id,
           //PatientId = Appointment.PatientId.Value,
           RequestId = Appointment.RequestId,
           RoomId = Appointment.RoomId.Value,
           Status = Appointment.Status.Value,
           Timestamp = Appointment.Timestamp.Value.ToString("yyyy-MM-dd HH:mm")
       };
}