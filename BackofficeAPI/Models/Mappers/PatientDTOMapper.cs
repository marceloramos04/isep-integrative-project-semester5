using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.DTO;

namespace Backoffice.Models.Mappers;

public class PatientDTOMapper{

    public static Patient dtoToDomain(PatientDTO dto){
        Patient domain= new Patient(
            new MedicalRecordNumber(dto.MedicalRecordNumber),
            new FirstName(dto.FirstName),
            new LastName(dto.LastName),
            new PhoneNumber(dto.PhoneNumber),
            new Email(dto.Email),
            new PhoneNumber(dto.EmergencyContact),
            new DateOfBirth(dto.DateOfBirth),
            new Gender(dto.Gender)
        );

        domain.MedicalConditions=dto.MedicalConditions;

        return domain;
    }

    public static PatientDTO domainToDTO(Patient domain){
        return new PatientDTO{
            MedicalRecordNumber=domain.MedicalRecordNumber.Value,
            FirstName=domain.FirstName.Value,
            LastName=domain.LastName.Value,
            PhoneNumber=domain.PhoneNumber.Number,
            Email=domain.Email.Address,
            EmergencyContact=domain.EmergencyContact.Number,
            MedicalConditions=domain.MedicalConditions,
            DateOfBirth=domain.DateOfBirth.Value,
            Gender=domain.Gender.Value};
    }
}