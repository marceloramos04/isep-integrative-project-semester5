using Backoffice.Models;
using Backoffice.Models.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace BackofficeAPI.Repositories
{
    public class SpecializationRepository
    {
        private readonly BackofficeContext _context;

        public SpecializationRepository(BackofficeContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Specialization>> GetAllSpecializationsAsync()
        {
            return await _context.Specializations.ToListAsync();
        }

        public async Task<Specialization> GetSpecializationByIdAsync(string id)
        {
            var specialization = await _context.Specializations.FindAsync(id);

            return specialization ?? new Specialization();
        }

        public async Task AddSpecializationAsync(Specialization specialization)
        {
            await _context.Specializations.AddAsync(specialization);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateSpecializationAsync(Specialization specialization)
        {
            _context.Specializations.Update(specialization);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteSpecializationAsync(string id)
        {
            var specialization = await _context.Specializations.FindAsync(id);
            if (specialization != null)
            {
                _context.Specializations.Remove(specialization);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Specialization>> SearchSpecializationsAsync(string specializationCode = null,
    string designation = null,
    string description = null)
        {
            var query = _context.Specializations.AsQueryable();

            // Exact match for specializationCode
            if (!string.IsNullOrEmpty(specializationCode))
            {
                query = query.Where(s => s.SpecializationCode == specializationCode);
            }

            // Partial match for designation
            if (!string.IsNullOrEmpty(designation))
            {
                query = query.Where(s => s.Designation.Contains(designation, StringComparison.OrdinalIgnoreCase));
            }

            // Partial match for description
            if (!string.IsNullOrEmpty(description))
            {
                query = query.Where(s => s.Description.Contains(description, StringComparison.OrdinalIgnoreCase));
            }

            // Execute the query and return the result
            return await query.ToListAsync();
        }
    }
}