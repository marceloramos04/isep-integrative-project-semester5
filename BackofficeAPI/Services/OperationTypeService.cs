using Backoffice.Models;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;
using Backoffice.Repositories;
using Backoffice.Models.Mappers;
using Backoffice.Models.DTO;
using Backoffice.Models.Domain.Entities;
using BackofficeAPI.Services;

namespace Backoffice.Services;

public class OperationTypeService
{

    private readonly OperationTypeRepository _types;
    private readonly SpecializationService specializationService;

    public async Task<OperationTypeDTO> CreateOperationType(OperationTypeDTO newOperationTypeDto)
    {
        // Validate that the operation name is unique
        if (_types.IsOperationNameExists(newOperationTypeDto.name))
        {
            throw new Exception($"An operation type with the name '{newOperationTypeDto.name}' already exists.");
        }

        // Convert DTO to Domain
        var newOperationType = new OperationType(
            new Designation(newOperationTypeDto.name),
            new DurationInMinutes(newOperationTypeDto.estimatedDuration)
        );

        // Add required staff
        foreach (var staff in newOperationTypeDto.requiredStaff)
        {
            newOperationType.AddRequiredStaff(new RequiredStaff(
                new Role(staff.role),
                await specializationService.GetSpecializationByIdAsync(staff.specializationCode),
                staff.quantity
            ));
        }

        // Save to repository
        await _types.AddOperationType(newOperationType);

        // Log the creation
        // Example: Log to a console/file/logging system
        Console.WriteLine($"New operation type '{newOperationTypeDto.name}' created successfully.");

        // Return the newly created operation type
        return OperationTypeMapper.domainToDTO(newOperationType);
    }


    public OperationTypeService(OperationTypeRepository repository)
    {
        _types = repository;
    }

    public async Task<List<OperationTypeDTO>> GetOperationTypes()
    {
        var types = await _types.GetOperationTypes();
        return types.ConvertAll(OperationTypeMapper.domainToDTO);
    }

    public async Task<List<OperationTypeDTO>> SearchOperationTypes(
        string typeName,
        string specialization,
        string status
    )
    {
        var list = await _types.SearchOperationTypes(typeName, specialization, status);
        return list.ConvertAll(OperationTypeMapper.domainToDTO);
    }

  public List<Specialization> GetSpecializations()
    {
        return specializationService.GetAllSpecializationsAsync().Result.ToList();
    }

    public async Task<List<string>> GetStatuses()
    {
        return OperationType.Statuses;
    }

    public async Task<List<string>> GetRoles()
    {
        return Role.rolesForStaff;
    }

    public async Task<OperationTypeDTO> GetOperationType(long id)
    {
        return OperationTypeMapper.domainToDTO(await _types.GetOperationTypeById(id));
    }
}