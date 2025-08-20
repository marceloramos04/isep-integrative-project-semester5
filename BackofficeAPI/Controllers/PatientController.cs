using Microsoft.AspNetCore.Mvc;
using Backoffice.Models.DTO;
using Backoffice.Models.Domain.Entities;
using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.Domain.Roots;
using Backoffice.Services;
using System.Net.Mail;
using Backoffice.Repositories.User;
using Backoffice.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.AspNetCore.Authorization;
using Backoffice.Models.Mappers;



namespace Backoffice.Controllers;

//[Authorize(Roles = "Admin")]
[Route("api/[controller]")]
[ApiController]
public class PatientController : ControllerBase
{
    private readonly PatientService _patientService;
    private readonly PatientRepository _patientRepository;
    private readonly BackofficeContext _context;

    public PatientController(
        BackofficeContext context
        )
    {
        _context = context;
        _patientRepository = new PatientRepository(context);
        _patientService = new PatientService(_patientRepository, new AuditLogRepository(context));


    }

    // GET: api/Patients
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
    {
        // return await _context.Patients.ToListAsync();
        var patientDTOs = _context.Patients.Select(patient => patientToDTO(patient)).ToListAsync();
        return Ok(patientDTOs);


    }

    // GET: api/Patients
    [HttpGet("search")]
    public async Task<ActionResult<List<PatientSearchDTO>>> GetPatients([FromQuery] PatientSearchDTO dto)
    {


        var patients = await _patientService.SearchPatients(dto);

        // if (patients == null || !patients.Any())
        // {
        //     return NotFound("No patients found matching the search criteria.");
        // }

        return Ok(patients);
    }


    /*
    {
        "medicalRecordNumber": "string",
        "firstName": "string",
        "lastName": "string",
        "phoneNumber": "1111111",
        "email": "str@test.ing",
        "emergencyContact": "2222222",
        "dateOfBirth": "2024-01-01",
        "gender": "string"
    }
    */

    // POST (CRIAR/REGISTAR)
    [HttpPost]
    public async Task<ActionResult<PatientDTO>> CreatePatient(CreatePatientDTO dto)
    {

        // // Validações dos dados do patient
        // if (string.IsNullOrWhiteSpace(dto.FirstName) ||
        //     string.IsNullOrWhiteSpace(dto.LastName) ||
        //      string.IsNullOrWhiteSpace(dto.PhoneNumber) ||
        //      string.IsNullOrWhiteSpace(dto.EmergencyContact) ||
        //    dto.DateOfBirth == default ||
        //      string.IsNullOrWhiteSpace(dto.Gender) ||
        //     !IsValidEmail(dto.Email))
        // {
        //     return BadRequest("Invalid patient data.");
        // }
        string errorMessage;

        if (string.IsNullOrWhiteSpace(dto.FirstName))
        {
            errorMessage = "First name is required.";
            return BadRequest(errorMessage);
        }

        if (string.IsNullOrWhiteSpace(dto.LastName))
        {
            errorMessage = "Last name is required.";
            return BadRequest(errorMessage);
        }

        if (string.IsNullOrWhiteSpace(dto.PhoneNumber))
        {
            errorMessage = "Phone number is required.";
            return BadRequest(errorMessage);
        }

        if (string.IsNullOrWhiteSpace(dto.EmergencyContact))
        {
            errorMessage = "Emergency contact is required.";
            return BadRequest(errorMessage);
        }

        if (dto.DateOfBirth == default)
        {
            errorMessage = "Date of birth is required.";
            return BadRequest(errorMessage);
        }

        if (string.IsNullOrWhiteSpace(dto.Gender))
        {
            errorMessage = "Gender is required.";
            return BadRequest(errorMessage);
        }

        if (!IsValidEmail(dto.Email))
        {
            errorMessage = "Invalid email address.";
            return BadRequest(errorMessage);
        }

        errorMessage = null;

        try
        {
            int nextSequentialNumber = await _patientRepository.GetNextSequentialNumberAsync();

            if (nextSequentialNumber == null)
            {
                return BadRequest("The patient's medical record number was not generated correctly.");
            }

            var patient = new Patient(
                 nextSequentialNumber,
                 new PhoneNumber(dto.PhoneNumber),
                 new Email(dto.Email),
                 new PhoneNumber(dto.EmergencyContact),
                 new DateOfBirth(dto.DateOfBirth),
                 new Gender(dto.Gender),
                 new LastName(dto.LastName),
                 new FirstName(dto.FirstName)
             );

            /*var result = await _patientService.AddPatientAsync(patient);
            if (!result.success)
            {
                return BadRequest(result.error);
            } */

            _patientService.Add(patient);
            await _context.SaveChangesAsync();


            var patientDto = patientToDTO(patient);
            var outcome = _context.Patients.Find(patient.MedicalRecordNumber);
            if (outcome != null)
            {
                return Ok(PatientDTOMapper.domainToDTO(outcome));
            }
            else return StatusCode(500, "An error occurred while creating the patient.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal error: {ex.Message}");
        }
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<PatientDTO>> GetPatientById(string id)
    {
        var patient = _patientService.GetPatientById(id);
        if (patient == null) return NotFound("The  patient is not registered");
        return patientToDTO(patient);
    }


    // PUT (UPDATE)
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPatient(string id, PatientDTO dto)
    {

        if (string.IsNullOrEmpty(dto.MedicalRecordNumber) || !id.Equals(dto.MedicalRecordNumber))
        {
            return BadRequest("The patient identification data is inconsistent. The medical record number in the request body must match the ID in the URL.");
        }

        try
        {
            var updatedPatient = await _patientService.UpdatePatientAsync(id, dto);

            if (updatedPatient == null)
            {
                return NotFound("The Patient might not be registered in the system found in the system!");
            }

            var updatedDTO = PatientDTOMapper.domainToDTO(updatedPatient);
            return Ok(updatedDTO);

        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }





    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePatient(string id)
    {
        if (id == null)
        {
            return BadRequest("The patient id cannot be null");
        }

        var patient = _patientService.GetPatientById(id);

        if (patient == null)
        {
            return NotFound("The patient was not found in the system");
        }

        await _patientService.DeletePatient(patient);

        return Ok(new { message = "Patient deleted successfully." });
    }





    private List<Appointment> ConvertAppointmentHistories(List<AppointmentHistory> appointmentHistoriesDto)
    {
        var appointments = new List<Appointment>();

        foreach (var history in appointmentHistoriesDto)
        {
            appointments.AddRange(history.Appointments);
        }

        return appointments;
    }

    private PatientDTO patientToDTO(Patient patient)
    {
        return new PatientDTO
        {
            MedicalRecordNumber = patient.MedicalRecordNumber.Value,
            FirstName = patient.FirstName.Value,
            LastName = patient.LastName.Value,
            PhoneNumber = patient.PhoneNumber.Number,
            Email = patient.Email.Address,
            EmergencyContact = patient.EmergencyContact.Number,
            DateOfBirth = patient.DateOfBirth.Value,
            Gender = patient.Gender.Value
        };
    }

    private bool requestExists(string id)
    {
        return _context.Patients.Any(e => e.MedicalRecordNumber.Equals(id));
    }



    private bool IsValidEmail(string email)
    {
        try
        {
            var addr = new Email(email);
            return true;
        }
        catch (Exception e)
        {
            throw new Exception(e.Message);
        }
    }


}
