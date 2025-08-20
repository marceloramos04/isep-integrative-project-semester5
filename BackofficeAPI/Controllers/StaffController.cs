namespace Backoffice.Controllers;

using System.Net.Mail;
using Backoffice.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backoffice.Services.Staff;
using Backoffice.Models.DTO;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.Entities;
using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Repositories.Staff;
using Backoffice.Repositories.User;
using Backoffice.Models.Mappers;
using BackofficeAPI.Repositories;

[Route("api/[controller]")]
[ApiController]
public class StaffController : ControllerBase
{
    private readonly BackofficeContext _context;
    private readonly StaffService _staffService;
    private readonly StaffRepository _staffRepository;
    private readonly SpecializationRepository _specializationRepository;

    public StaffController(BackofficeContext context)
    {
        _context = context;
        _staffRepository = new StaffRepository(_context);
        _staffService = new StaffService(_staffRepository, new UserRepository(_context));
    }

    //GET: api/staffs
    [HttpGet]
    public async Task<ActionResult<IEnumerable<StaffDTO>>> GetStaffList()
    {
        IEnumerable<Staff> allStaff = await _staffRepository.getAllStaff();
        List<StaffDTO> allStaffDTO = new List<StaffDTO>();
        foreach (Staff staff in allStaff)
        {
            allStaffDTO.Add(StaffDTOMapper.domainToDTO(staff));
        }
        return allStaffDTO;
    }

    // GET: api/staffs/5
    // <snippet_GetByID>
    [HttpGet("{id}")]
    public async Task<ActionResult<StaffDTO>> GetStaff(string id)
    {

        return StaffDTOMapper.domainToDTO(await _staffService.GetStaff(id));
    }
    
    // </snippet_GetByID>

    // PUT: api/staffs/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Update>
    [HttpPut("{id}")]
    public async Task<IActionResult> PutStaff(string id, StaffEditableFieldsDTO dto)
    {

        if (id != dto.Id)
        {
            return BadRequest("The ID in the URL does not match the ID in the provided data.");
        }

        if (string.IsNullOrWhiteSpace(dto.SpecializationCode) || string.IsNullOrWhiteSpace(dto.PhoneNumber) || !IsValidEmail(dto.Email))
        {
            return BadRequest("Dados do usuário inválidos.");
        }

        Staff staff = await _staffRepository.GetStaff(new StaffId(id));
        if (staff == null)
        {
            return NotFound("Staff doesn't exist");
        }

        Specialization specialization = _specializationRepository.GetSpecializationByIdAsync(dto.SpecializationCode).Result;
        staff.SpecializationCode = specialization.SpecializationCode;
        staff.Email = new Email(dto.Email);
        staff.PhoneNumber = new PhoneNumber(dto.PhoneNumber);


        List<TimeSlot> newAvailabilitySlots = new List<TimeSlot>();
        foreach (TimeSlotDTO slotDto in dto.AvailabilitySlots)
        {
            newAvailabilitySlots.Add(TimeSlotMapper.dtoToDomain(slotDto));
        }
        staff.AvailabilitySlots = newAvailabilitySlots;

        await _staffService.UpdateStaff(staff);

        return Ok("Staff has been updated successfully");
    }


    // </snippet_Update>

    // POST: api/staffs
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Create>
    [HttpPost]
    public async Task<ActionResult<StaffDTO>> PostStaff(StaffDTO staffDTO)
    {

        // Staff staff = StaffFromDTO(staffDTO);

        // _context.Staff.Add(staff);
        // await _context.SaveChangesAsync();
        try
        {
            Staff staff = _staffService.AddStaff(staffDTO).Result;

            return CreatedAtAction(
                nameof(GetStaff),
                new { id = staff.Id },
                StaffDTOMapper.domainToDTO(staff));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }

    }
    // </snippet_Create>

    // DELETE: api/staffs/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Deletestaff(string id)
    {
        Staff staff = await _context.Staff.FindAsync(new StaffId(id));
        if (staff == null)
        {
            return NotFound();
        }

        _context.Staff.Remove(staff);
        await _context.SaveChangesAsync();

        return Ok("Staff deleted successfully");
    }

    [HttpGet("search")]
    public async Task<ActionResult<IEnumerable<StaffDTO>>> SearchStaff(
        [FromQuery] string name,
        [FromQuery] string email,
        [FromQuery] string specializationCode,
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
    {
        var query = _staffRepository.QueryAllStaff();

        // Filters staff
        if (!string.IsNullOrWhiteSpace(name))
        {
            query = query.Where(s => s.FirstName.Value.Contains(name) || s.LastName.Value.Contains(name));
        }

        if (!string.IsNullOrWhiteSpace(email))
        {
            query = query.Where(s => s.Email.Address.Contains(email));
        }

        if (!string.IsNullOrWhiteSpace(specializationCode))
        {
            query = query.Where(s => s.SpecializationCode.Contains(specializationCode));
        }

        // Apply pagination
        query = query.Skip((page - 1) * pageSize).Take(pageSize);

        // Get the filtered and paginated list
        var staffList = await query.ToListAsync();

        // Map the staff list to DTO
        var staffDtoList = staffList.Select(s => new StaffDTO
        {
            Id = s.Id.Value,
            FirstName = s.FirstName.Value,
            LastName = s.LastName.Value,
            Email = s.Email.Address,
            PhoneNumber = s.PhoneNumber.Number,
            SpecializationCode = s.SpecializationCode
        }).ToList();

        return Ok(staffDtoList);
    }


    // PATCH: api/staffs/{id}/deactivate
    [HttpPatch("{id}/deactivate")]
    public async Task<IActionResult> DeactivateStaff(string id)
    {
        // Use FindAsync to find the staff by ID
        Staff staff = await _context.Staff.FindAsync(new StaffId(id));

        // Check if the staff member exists
        if (staff == null)
        {
            return NotFound(new { Message = "Staff doesn't exist" });
        }

        // Set the status of the staff to inactive
        staff.Status = StaffStatus.Inactive();

        // Track the changes and save them
        try
        {
            await _context.SaveChangesAsync(); // Save changes to the database
        }
        catch (DbUpdateConcurrencyException ex)
        {
            // Handle concurrency issues if they occur
            return Conflict(new { Message = "Concurrency conflict occurred. Staff might have been updated or deleted by another process." });
        }

        return Ok(new { Message = "Staff deactivated successfully." });
    }

    [HttpGet("specializations")]
    public async Task<ActionResult<IEnumerable<string>>> GetSpecializations()
    {
        var specializations = _staffService.GetSpecializations();
        return Ok(specializations);
    }


    private bool IsValidEmail(string email)
    {
        try
        {
            var addr = new MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }

}

