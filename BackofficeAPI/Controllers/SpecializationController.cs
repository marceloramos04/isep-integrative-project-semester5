using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backoffice.Models;
using Backoffice.Models.Domain.ValueObjects;
using BackofficeAPI.Models.DTO;
using BackofficeAPI.Repositories;
using BackofficeAPI.Services;
using BackofficeAPI.Models.Mappers;

namespace BackofficeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecializationController : ControllerBase
    {
        private readonly BackofficeContext _context;
        private readonly SpecializationRepository _specializationRepository;
        private readonly SpecializationService _specializationService;


        public SpecializationController(BackofficeContext context)
        {
            _context = context;
            _specializationRepository = new SpecializationRepository(_context);
            _specializationService = new SpecializationService(_specializationRepository);
        }

        // GET: api/Specialization
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Specialization>>> GetSpecializations()
        {
            var specializations = await _specializationService.GetAllSpecializationsAsync();
            return Ok(specializations);
        }

        // GET: api/Specialization/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Specialization>> GetSpecialization(string id)
        {
            return await _specializationService.GetSpecializationByIdAsync(id);
        }

        // PUT: api/Specialization/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSpecialization(string id, SpecializationDTO specializationDTO)
        {
            if (id != specializationDTO.SpecializationCode)
            {
                return BadRequest();
            }
            Specialization specialization = SpecializationMapper.ToDomain(specializationDTO);

            _context.Entry(specialization).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SpecializationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Specialization
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Specialization>> PostSpecialization(Specialization specialization)
        {
            _context.Specializations.Add(specialization);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (SpecializationExists(specialization.SpecializationCode))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetSpecialization", new { id = specialization.SpecializationCode }, specialization);
        }

        // DELETE: api/Specialization/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSpecialization(string id)
        {
            var specialization = await _context.Specializations.FindAsync(id);
            if (specialization == null)
            {
                return NotFound();
            }

            _context.Specializations.Remove(specialization);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Specialization/search
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<SpecializationDTO>>> SearchSpecializations(
            [FromQuery] string specializationCode = null,
            [FromQuery] string designation = null,
            [FromQuery] string description = null)
        {
            var specializations = await _specializationService.SearchSpecializationsAsync(specializationCode, designation, description);
            return Ok(specializations);
        }

        private bool SpecializationExists(string id)
        {
            return _context.Specializations.Any(e => e.SpecializationCode == id);
        }
    }
}
