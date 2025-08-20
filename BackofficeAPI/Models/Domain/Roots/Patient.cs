using Backoffice.Models.Domain.ValueObjects;
using System;
namespace Backoffice.Models.Domain.Roots
{
    public class Patient : UserProfile
    {
        public MedicalRecordNumber MedicalRecordNumber { get; set; }
        public string UserId { get; set; } = "";
        public virtual User User { get; set; }
        public FirstName FirstName { get; set; }
        public LastName LastName { get; set; }
        public PhoneNumber PhoneNumber { get; set; }
        public Email Email { get; set; }
        public PhoneNumber EmergencyContact { get; set; }
        public List<MedicalCondition> MedicalConditions { get; set; } = new List<MedicalCondition>();
        public List<Appointment> AppointmentHistory { get; set; } = new List<Appointment>();
        public DateOfBirth DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public FullName FullName { get; private set; }
        
        public Patient() {}

        public Patient(
            MedicalRecordNumber medicalRecordNumber,
            FirstName firstName,
            LastName lastName,
            PhoneNumber phoneNumber,
            Email email,
            PhoneNumber emergencyContact,
            DateOfBirth dateOfBirth,
            Gender gender
            )
        {
            MedicalRecordNumber = medicalRecordNumber;
            PhoneNumber = phoneNumber;
            Email = email;
            //MedicalConditions = medicalCondition;
            EmergencyContact = emergencyContact;
            DateOfBirth = dateOfBirth;
            Gender = gender;
            FullName = new FullName(firstName, lastName);
            LastName = lastName;
            FirstName = firstName;
        }

        public Patient(
            int sequentialNumber,
            PhoneNumber phoneNumber,
            Email email,
            //MedicalCondition medicalCondition,
            PhoneNumber emergencyContact,
            DateOfBirth dateOfBirth,
            Gender gender,
            LastName lastName,
            FirstName firstName)
        {
            MedicalRecordNumber = MedicalRecordNumber.Generate(sequentialNumber);
            PhoneNumber = phoneNumber;
            Email = email;
            //MedicalConditions = medicalCondition;
            EmergencyContact = emergencyContact;
            DateOfBirth = dateOfBirth;
            Gender = gender;
            FullName = new FullName(firstName, lastName);
            LastName = lastName;
            FirstName = firstName;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(MedicalRecordNumber, Email, PhoneNumber);
        }

        public void UpdateProfile(PhoneNumber phoneNumber, Email email, List<MedicalCondition> medicalConditions, PhoneNumber emergencyContact, DateOfBirth dateOfBirth, Gender gender, FullName fullName, LastName lastName, FirstName firstName)
        {
            PhoneNumber = phoneNumber; // Atualiza o número de telefone
            Email = email; // Atualiza o e-mail
            MedicalConditions = medicalConditions; // Atualiza a condição médica
            EmergencyContact = emergencyContact; // Atualiza o contato de emergência
            DateOfBirth = dateOfBirth; // Atualiza a data de nascimento
            Gender = gender; // Atualiza o gênero
            //FullName = fullName; // Atualiza o nome completo
            LastName = lastName; // Atualiza o sobrenome
            FirstName = firstName; // Atualiza o primeiro nome
        }

        public string GetUserId()
        {
            return UserId;
        }
    }
}