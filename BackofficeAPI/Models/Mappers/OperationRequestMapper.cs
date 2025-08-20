using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.DTO;

namespace Backoffice.Models.Mappers;

public class OperationRequestMapper{

    // public static OperationRequestDTO2 domainToDTO(OperationRequest domain){
    //     return new OperationRequestDTO2{
    //         id=domain.Id,
    //         name=domain.Name.Value,
    //         requiredStaff=domain.RequiredStaff.ConvertAll(rs=>new OperationTypeDTO.RequiredStaffDTO{
    //             specialization=rs.Specialization.Name,
    //             quantitiy=rs.Quantity
    //         }),
    //         estimatedDuration=domain.EstimatedDuration.Value
    //     };
    // }
}