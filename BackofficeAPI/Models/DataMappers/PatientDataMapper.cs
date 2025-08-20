using Backoffice.Models.DataModels;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.ValueObjects;

namespace Backoffice.Models.DataMappers;

public class PatientDataMapper{

    public static PatientData domainToData(Patient patient){

        return new PatientData{
            MedicalRecordNumber = patient.MedicalRecordNumber.Value,
            FirstName = patient.FirstName.Value,
            LastName = patient.LastName.Value,
            PhoneNumber = patient.PhoneNumber.Number,
            Email = patient.Email.Address,
            EmergencyContact = patient.EmergencyContact.Number,
            MedicalConditions = patient.MedicalConditions,
            DateOfBirth = patient.DateOfBirth.Value,
            Gender = patient.Gender.Value
        };
    }

    public static Patient dataToDomain(PatientData data){

        return new Patient(
            new MedicalRecordNumber(data.MedicalRecordNumber),
            new FirstName(data.FirstName),
            new LastName(data.LastName),
            new PhoneNumber(data.PhoneNumber),
            new Email(data.Email),
            new PhoneNumber(data.EmergencyContact),
            new DateOfBirth(data.DateOfBirth),
            new Gender(data.Gender)
        );
    }
}