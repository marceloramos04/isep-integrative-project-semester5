using BackofficeAPI.Repositories;
using Backoffice.Models.Domain.ValueObjects;
using BackofficeAPI.Models.DTO;
using BackofficeAPI.Models.Mappers;

namespace BackofficeAPI.Services
{
    public class SpecializationService
    {
        // This is a placeholder for your data source, e.g., a database context
        private readonly SpecializationRepository _repository;
        public SpecializationService(SpecializationRepository dataSource)
        {
            _repository = dataSource;
        }

        // Method to get all specializations
        public async Task<IEnumerable<Specialization>> GetAllSpecializationsAsync()
        {
            return await _repository.GetAllSpecializationsAsync();
        }

        // Method to get a specialization by ID
        public async Task<Specialization> GetSpecializationByIdAsync(string id)
        {
            return await _repository.GetSpecializationByIdAsync(id);
        }

        // Method to create a new specialization
        public async Task<Specialization> AddSpecializationAsync(Specialization specialization)
        {
            await _repository.AddSpecializationAsync(specialization);
            return specialization;
        }

        // Method to update an existing specialization
        public async Task<Specialization> UpdateSpecializationAsync(Specialization specialization)
        {
            await _repository.UpdateSpecializationAsync(specialization);
            return specialization;
        }

        // Method to delete a specialization by ID
        public async Task DeleteSpecializationAsync(string id)
        {
            await _repository.DeleteSpecializationAsync(id);
        }

        public async Task<IEnumerable<SpecializationDTO>> SearchSpecializationsAsync(string specializationCode = null, string designation = null, string description = null)
        {

            var specializations = await _repository.SearchSpecializationsAsync(specializationCode, designation, description);

            var specializationDtos = specializations.Select(s => SpecializationMapper.ToDTO(s)).ToList();

            return specializationDtos;
        }
    }

}