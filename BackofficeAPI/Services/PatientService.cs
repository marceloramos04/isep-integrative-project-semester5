using System;
using System.Collections.Generic;
using System.Linq;
using Backoffice.Models.DTO;
using Backoffice.Repositories;
using Backoffice.Repositories.User;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.Entities;
using Backoffice.Models.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

namespace Backoffice.Services
{
    public class PatientService
    {
        private readonly PatientRepository _repository;
        private readonly AuditLogRepository _auditLogRepository;

        public PatientService(PatientRepository repository, AuditLogRepository auditLogRepository)
        {
            _repository = repository;
            _auditLogRepository = auditLogRepository;
        }


        public async void Add(Patient patient)
        {
            await _repository.Add(patient);
        }


        public async Task<List<PatientSearchDTO>> SearchPatients(PatientSearchDTO dto)
        {
            // var dto = patientToDTO(firstName, lastName, email, dateOfBirth, medicalRecordNumber);
            var list= await _repository.SearchPatientsAsync(dto.FirstName, dto.LastName, dto.Email, dto.DateOfBirth, dto.MedicalRecordNumber);
            return list.ConvertAll(p => new PatientSearchDTO
            {
                MedicalRecordNumber = p.MedicalRecordNumber.Value,
                FirstName = p.FirstName.Value,
                LastName = p.LastName.Value,
                Email = p.Email.Address,
                DateOfBirth = p.DateOfBirth.Value.ToString("yyyy-MM-dd")
            });

        }


        // public async Task<List<PatientSearchDTO>> SearchPatients(PatientSearchDTO dto)
        // {

        //     var fullName = string.Concat(dto.FirstName, " ", dto.LastName);

        //     var patients = await _repository.SearchPatientsAsync(dto.FirstName, dto.LastName, dto.Email, DateTime.Parse(dto.DateOfBirth), dto.MedicalRecordNumber);

        //     var paginatedQuery = patients
        //        .Skip((page - 1) * pageSize)
        //         .Take(pageSize);


        //     var result = paginatedQuery
        //       .Select(p => new PatientSearchDTO
        //       {
        //           FirstName = p.FirstName.Value,
        //           LastName = p.LastName.Value,
        //           Email = p.Email.Address,
        //           DateOfBirth = p.DateOfBirth.Value.ToString("yyyy-MM-dd")
        //       })
        //       .ToList();

        //     return result;

        // }


        public Patient GetPatientById(string id)
        {
            var patient = _repository.GetByIdAsync(id).Result;
            return patient;

        }


        // LogProfileUpdate
        public async Task LogProfileUpdate(Patient patient, string changeDescription)
        {
            var log = new AuditLog
            {
                PatientId = int.Parse(patient.MedicalRecordNumber.Value),
                ChangeDescription = changeDescription,
                ChangeDate = DateTime.UtcNow
            };
            await _auditLogRepository.AddLogAsync(log);
        }

        public async Task<Patient> UpdatePatientAsync(string id, PatientDTO dto)
        {


            // Fetch the patient from the database
            var patient = await _repository.GetByIdAsync(id);
            if (patient == null)
            {
                return null;
            }

            // Update the patient information
            patient.FirstName = new FirstName(dto.FirstName);
            patient.LastName = new LastName(dto.LastName);
            patient.PhoneNumber = new PhoneNumber(dto.PhoneNumber);
            patient.Email = new Email(dto.Email);
            patient.EmergencyContact = new PhoneNumber(dto.EmergencyContact);

            if (dto.MedicalConditions != null)
            {
                patient.MedicalConditions = dto.MedicalConditions
                    .Select(mc => new MedicalCondition(mc.Name, mc.Description))
                    .ToList();
            }

            patient.DateOfBirth = new DateOfBirth(dto.DateOfBirth);
            patient.Gender = new Gender(dto.Gender);

            // Save changes
            await _repository.SaveChangesAsync();

            return patient;
        }

        public async Task DeletePatient(Patient patient)
        {

            await _repository.DeleteAsync(patient);

        }
        private PatientSearchDTO patientToDTO(string firstName, string lastName, string email, string dateOfBirth, string medicalRecordNumber)
        {
            return new PatientSearchDTO
            {
                MedicalRecordNumber =medicalRecordNumber,
                FirstName = firstName,
                LastName =lastName,
                Email =email,
                DateOfBirth =dateOfBirth
                          };
        }



        //Exclusividade e-mail e telemóvel
        /*public async Task<(bool success, string error)> AddPatientAsync(Patient patient)
        {
            if (await _repository.EmailExistsAsync(patient.Email.Address))
            {
                return (false, "Email is already in use.");
            }

            if (await _repository.PhoneNumberExistsAsync(patient.PhoneNumber.Number))
            {
                return (false, "Phone number is already in use.");
            }

            await _repository.Add(patient);
            return (true, null);
        }*/

    }

}
