using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backoffice.Models;
using Backoffice.Models.DTO;
using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.Domain.Roots;
using Backoffice.Services;

namespace Backoffice.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OperationRequestController : ControllerBase
{
    private readonly BackofficeContext _context;
    private readonly OperationRequestService _service;

    public OperationRequestController(BackofficeContext context)
    {
        _context = context;
        _service = new OperationRequestService(context);
    }

    // GET: api/OperationRequests
    [HttpGet]
    public async Task<ActionResult<IEnumerable<OperationRequestDTO>>> GetOperationRequests()
    {
        return await _context.OperationRequests
            .Select(x => RequestToDTO(x))
            .ToListAsync();
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<OperationRequestDTO2>>> GetFilteredOperationRequests(
        [FromQuery] string staffId,
        [FromQuery] string? patientFirstName,
        [FromQuery] string? patientLastName,
        [FromQuery] long? operationTypeId,
        [FromQuery] string? priority,
        [FromQuery] string? status)
    {
        var requests = _service.GetFilteredOperationRequests(
            staffId,
            patientFirstName,
            patientLastName,
            priority,
            operationTypeId,
            status
        );

        return Ok(requests);
    }

    // GET: api/OperationRequests/5
    // <snippet_GetByID>
    [HttpGet("{id}")]
    public async Task<ActionResult<OperationRequestDTO2>> GetRequest(long id)
    {
        var dto = _service.GetRequestById(id);
        if (dto == null)
        {
            return NotFound();
        }
        return Ok(dto);
        // var request = await _context.OperationRequests.FindAsync(id);

        // if (request == null)
        // {
        //     return NotFound();
        // }

        // return RequestToDTO(request);
    }
    // </snippet_GetByID>

    // PUT: api/OperationRequests/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Update>
    [HttpPut("{id}")]
    public async Task<IActionResult> Putrequest(long id, OperationRequestDTO dto)
    {
        if (id != dto.Id)
        {
            return BadRequest();
        }

        var request = await _context.OperationRequests.FindAsync(id);
        if (request == null)
        {
            return NotFound();
        }

        Patient patient = request.Patient;
        if (dto.PatientId != null)
        {
            patient = await _context.Patients.FindAsync(new MedicalRecordNumber(dto.PatientId)) ?? throw new ArgumentException("Patient not found");
        }

        Staff doctor = request.Doctor;
        if (dto.DoctorId != null)
        {
            doctor = await _context.Staff.FindAsync(new StaffId(dto.DoctorId)) ?? throw new ArgumentException("Doctor not found");
        }

        OperationType operationType = request.OperationType;
        if (dto.OperationTypeId != null)
            operationType = await _context.OperationTypes.FindAsync(dto.OperationTypeId) ?? throw new ArgumentException("Operation type not found");

        Priority priority = request.Priority;
        if (dto.Priority != null)
            priority = new Priority(dto.Priority);

        Deadline deadline = request.Deadline;
        if (dto.Deadline != null)
            deadline = new Deadline(DateTime.Parse(dto.Deadline));

        request.Patient = patient;
        request.Doctor = doctor;
        request.OperationType = operationType;
        request.Priority = priority;
        request.Deadline = deadline;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) when (!requestExists(id))
        {
            return NotFound();
        }

        return NoContent();
    }
    // </snippet_Update>

    // POST: api/OperationRequests
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Create>
    [HttpPost]
    public async Task<ActionResult<OperationRequestDTO>> Postrequest(OperationRequestDTO dto)
    {
        try
        {

            if (dto.PatientId == null || dto.DoctorId == null || dto.OperationTypeId == null || dto.Priority == null || dto.Deadline == null)
                return BadRequest("Missing required fields");

            Patient patient = await _context.Patients.FindAsync(new MedicalRecordNumber(dto.PatientId)) ?? throw new ArgumentException("Patient not found"); ;
            Staff doctor = await _context.Staff.FindAsync(new StaffId(dto.DoctorId)) ?? throw new ArgumentException("Doctor not found");
            OperationType operationType = await _context.OperationTypes.FindAsync(dto.OperationTypeId) ?? throw new ArgumentException("Operation type not found");
            Priority priority = new Priority(dto.Priority);
            Deadline deadline = new Deadline(DateTime.Parse(dto.Deadline));

            OperationRequest request = new OperationRequest(patient.MedicalRecordNumber, doctor.Id, operationType.Id, priority, deadline);

            _context.OperationRequests.Add(request);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetRequest),
                new { id = request.Id },
                RequestToDTO(request));

        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    // </snippet_Create>

    // DELETE: api/OperationRequests/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Deleterequest(long id)
    {
        var request = await _context.OperationRequests.FindAsync(id);
        if (request == null)
        {
            return NotFound();
        }

        _context.OperationRequests.Remove(request);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool requestExists(long id)
    {
        return _context.OperationRequests.Any(e => e.Id == id);
    }

    private static OperationRequestDTO RequestToDTO(OperationRequest request)
    {
        if (request == null)
            throw new ArgumentNullException(nameof(request));

        //return OperationRequestDTO.Default;

        return new OperationRequestDTO
        {
            Id = request.Id,
            PatientId = request.PatientId.Value,
            DoctorId = request.DoctorId.Value,
            OperationTypeId = request.OperationTypeId,
            Priority = request.Priority.Value,
            Deadline = request.Deadline.Value.ToString("yyyy-MM-dd"),
        };
    }

    [HttpGet("statuses")]
    public async Task<ActionResult<IEnumerable<string>>> GetRequestStatuses(){
        return Ok(_service.GetRequestStatuses());
    }

    [HttpGet("priorities")]
    public async Task<ActionResult<IEnumerable<string>>> GetPriorities(){
        return Ok(_service.GetPriorities());
    }

}