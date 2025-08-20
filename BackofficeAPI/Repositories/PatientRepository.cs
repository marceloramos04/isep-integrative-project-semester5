namespace Backoffice.Repositories.User;

using Backoffice.Models;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.Entities;
using Backoffice.Models.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;



public class PatientRepository
{

    private BackofficeContext _context;

    public PatientRepository(BackofficeContext context)
    {
        _context = context;
    }

    public async Task<List<Patient>> SearchPatientsAsync(string firstName, string lastName, string email, string dateOfBirth, string medicalRecordNumber)
    {
        var query = _context.Patients.AsQueryable();

        // Verificando se algum nome foi fornecido, tratando nome completo com FirstName e LastName
        if (!string.IsNullOrEmpty(firstName) || !string.IsNullOrEmpty(lastName))
        {
            // Se ambos, firstName e lastName, foram fornecidos
            if (!string.IsNullOrEmpty(firstName) && !string.IsNullOrEmpty(lastName))
            {
                query = query.Where(p =>
                    p.FullName.FirstName.Value.Equals(firstName, StringComparison.OrdinalIgnoreCase) &&
                    p.FullName.LastName.Value.Equals(lastName, StringComparison.OrdinalIgnoreCase));
            }
            // Se apenas o firstName foi fornecido
            else if (!string.IsNullOrEmpty(firstName))
            {
                query = query.Where(p =>
                    p.FullName.FirstName.Value.Equals(firstName, StringComparison.OrdinalIgnoreCase));
            }
            // Se apenas o lastName foi fornecido
            else if (!string.IsNullOrEmpty(lastName))
            {
                query = query.Where(p =>
                    p.FullName.LastName.Value.Equals(lastName, StringComparison.OrdinalIgnoreCase));
            }
        }

        // Verificação de e-mail, caso fornecido
        if (!string.IsNullOrEmpty(email))
        {
            query = query.Where(p => p.Email.Address.Contains(email, StringComparison.OrdinalIgnoreCase));
        }

        // Verificação de data de nascimento, caso fornecida
        if (!string.IsNullOrEmpty(dateOfBirth))
        {
            var parsedDate = DateTime.Parse(dateOfBirth);
            query = query.Where(p => p.DateOfBirth.Value == parsedDate);
        }

        // Verificação de número de registro médico, caso fornecido
        if (!string.IsNullOrEmpty(medicalRecordNumber))
        {
            query = query.Where(p => p.MedicalRecordNumber.Value == medicalRecordNumber);
        }

        // Executa a consulta no banco de dados e retorna a lista de pacientes
        return await query.ToListAsync();
    }





    public async Task<Patient> Add(Patient patient)
    {
        Patient saved = _context.Patients.Add(patient).Entity;
        await _context.SaveChangesAsync();
        return saved;
    }

    public async Task<Patient> GetByIdAsync(string id)
    {
        var patient = await _context.Patients.FindAsync(new MedicalRecordNumber(id)) ?? throw new KeyNotFoundException($"Patient with ID {id} not found.");
        return patient;
    }

    public async Task<Patient> GetByUsernameAsync(string username)
    {
        return await _context.Patients.FirstOrDefaultAsync(patient => patient.FullName.FirstName.Value == username);
    }

    public async Task<Patient> getByEmailAsync(string email)
    {
        return await _context.Patients.Where(u => u.Email.Address == email).FirstOrDefaultAsync();
    }

    public void Update(Patient patient) => _context.Patients.Update(patient);

    public async Task DeleteAsync(Patient patient)
    {
        _context.Patients.Remove(patient);
        await _context.SaveChangesAsync();
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
    public void Save() => _context.SaveChanges();

    public async Task<int> GetNextSequentialNumberAsync()
    {
        Patient lastPatient = await _context.Patients.OrderByDescending(p => p.MedicalRecordNumber).FirstOrDefaultAsync();
        if (lastPatient == null) return 1;
        string lastPatientId = lastPatient.MedicalRecordNumber.Value;
        string lastSequentialNumber = lastPatientId.Substring(lastPatientId.Length - 6);
        // string nextSequentialNumber = (int.Parse(lastSequentialNumber) + 1 + "").PadLeft(6, '0');
        // return nextSequentialNumber;

        return int.Parse(lastSequentialNumber) + 1;
    }

    //Existência de e-mail e nº de telemóvel duplicados
    /*public async Task<bool> EmailExistsAsync(string email)
    {
        return await _context.Patients.AnyAsync(p => p.Email.Address == email);
    }

    public async Task<bool> PhoneNumberExistsAsync(string phoneNumber)
    {
        return await _context.Patients.AnyAsync(p => p.PhoneNumber.Number == phoneNumber);
    }*/

}