using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.DTO;

namespace Backoffice.Models.Mappers;

public class OperationTypeMapper{

    // public static OperationType dtoToDomain(OperationTypeDTO dto){
    //     OperationType domain= new OperationType();
        
    //     return domain;
    // }

    public static OperationTypeDTO domainToDTO(OperationType domain){
        return new OperationTypeDTO{
            id=domain.Id,
            name=domain.Name.Value,
            requiredStaff=domain.RequiredStaff.ConvertAll(rs=>new OperationTypeDTO.RequiredStaffDTO{
                role=rs.Role.Name,
                specializationCode =rs.Specialization.SpecializationCode,
                quantity=rs.Quantity,
            }),
            estimatedDuration=domain.EstimatedDuration.Value,
            status=domain.status,
        };
    }
}