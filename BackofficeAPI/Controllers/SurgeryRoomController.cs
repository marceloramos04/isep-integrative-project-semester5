using Backoffice.Models;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.Entities;
using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backoffice.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SurgeryRoomController : ControllerBase
{
    private readonly BackofficeContext _context;

    public SurgeryRoomController(BackofficeContext context)
    {
        _context = context;
    }

    // GET: api/SurgeryRooms
    [HttpGet]
    public async Task<ActionResult<IEnumerable<SurgeryRoomDTO>>> GetSurgeryRooms()
    {
        return await _context.SurgeryRooms
            .Select(x => SurgeryRoomToDTO(x))
            .ToListAsync();
    }

    // GET: api/SurgeryRooms/5
    // <snippet_GetByID>
    [HttpGet("{id}")]
    public async Task<ActionResult<SurgeryRoomDTO>> GetSurgeryRoom(string id)
    {
        var SurgeryRoom = await _context.SurgeryRooms.FindAsync(new RoomNumber(id));

        if (SurgeryRoom == null)
        {
            return NotFound();
        }

        return SurgeryRoomToDTO(SurgeryRoom);
    }
    // </snippet_GetByID>

    // PUT: api/SurgeryRooms/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Update>
    [HttpPut("{id}")]
    public async Task<IActionResult> PutSurgeryRoom(string id, SurgeryRoomDTO dto)
    {

        var SurgeryRoom = await _context.SurgeryRooms.FindAsync(new RoomNumber(id));
        if (SurgeryRoom == null)
        {
            return NotFound();
        }

        //SurgeryRoom.PatientId = new MedicalRecordNumber(dto.PatientId);
        SurgeryRoom.Status = new RoomStatus(dto.Status);
        SurgeryRoom.Type = new RoomType(dto.Type);
        SurgeryRoom.Capacity = new RoomCapacity(dto.Capacity);

        _context.SurgeryRooms.Update(SurgeryRoom);

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) when (!SurgeryRoomExists(id))
        {
            return NotFound();
        }

        return NoContent();
    }
    // </snippet_Update>

    // POST: api/SurgeryRooms
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    // <snippet_Create>
    [HttpPost]
    public async Task<ActionResult<SurgeryRoomDTO>> PostSurgeryRoom(SurgeryRoomDTO dto)
    {

        var lastRoomNumber = _context.SurgeryRooms
            .OrderByDescending(x => x.Id)
            .Select(x => x.Id)
            .FirstOrDefault();

        RoomNumber nextRoomNumber;

        if (lastRoomNumber == null)
        {
            nextRoomNumber = new RoomNumber("1");

        }
        else
            nextRoomNumber = new RoomNumber(int.Parse(lastRoomNumber.Value) + 1 + "");

        SurgeryRoom SurgeryRoom = new SurgeryRoom(
            nextRoomNumber,
            new RoomStatus(dto.Status),
            new RoomType(dto.Type),
            new RoomCapacity(dto.Capacity));

        _context.SurgeryRooms.Add(SurgeryRoom);
        await _context.SaveChangesAsync();

        return CreatedAtAction(
            nameof(GetSurgeryRoom),
            new { id = SurgeryRoom.Id },
            SurgeryRoomToDTO(SurgeryRoom));
    }
    // </snippet_Create>

    // DELETE: api/SurgeryRooms/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteSurgeryRoom(string id)
    {
        var SurgeryRoom = await _context.SurgeryRooms.FindAsync(new RoomNumber(id));
        if (SurgeryRoom == null)
        {
            return NotFound();
        }

        _context.SurgeryRooms.Remove(SurgeryRoom);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool SurgeryRoomExists(string id)
    {
        return _context.SurgeryRooms.Any(e => e.Id.Value == id);
    }

    private static SurgeryRoomDTO SurgeryRoomToDTO(SurgeryRoom SurgeryRoom) =>
       new SurgeryRoomDTO
       {
           Id = SurgeryRoom.Id.Value,
           Status = SurgeryRoom.Status.Value,
           Type = SurgeryRoom.Type.Value,
           Capacity = SurgeryRoom.Capacity.Value
       };
}