namespace Backoffice.Services.Staff;

using System;
using Backoffice.Repositories;
using Backoffice.Repositories.Staff;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.Entities;
using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Repositories.User;
using Backoffice.Models.DTO;
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using BackofficeAPI.Repositories;
using BackofficeAPI.Services;

public class StaffService
{

    private StaffRepository _staffRepository;
    private IUserRepository _userRepository;
    private SpecializationService _specializationService;
    

    public StaffService(StaffRepository repository, IUserRepository userRepository)
    {
        _staffRepository = repository;
        _userRepository = userRepository;
    }

    public async Task<Staff> GetStaff(string id)
    {
        return await _staffRepository.GetStaff(new StaffId(id));
    }

    public async Task<Staff> AddStaff(StaffDTO dto)
    {

        if (!isEmailUnique(dto.Email))
        {
            throw new Exception("Email already exists");
        }
        if (!isPhoneNumberUnique(dto.PhoneNumber))
        {
            throw new Exception("PhoneNumber already exists");
        }

        StaffId newStaffId = GenerateStaffId(dto.Email);
        Specialization specialization = _specializationService.GetSpecializationByIdAsync(dto.SpecializationCode).Result;       

        Staff newStaff = new Staff(
            newStaffId,
            new FirstName(dto.FirstName),
            new LastName(dto.LastName),
            new LicenseNumber(dto.LicenseNumber),
            specialization.SpecializationCode,
            new Email(dto.Email),
            new PhoneNumber(dto.PhoneNumber));


        foreach (TimeSlotDTO slotDto in dto.AvailabilitySlots)
        {
            TimeSlot slot = new TimeSlot(TimeOnly.Parse(slotDto.Start), TimeOnly.Parse(slotDto.End));
            newStaff.AvailabilitySlots.Add(slot);
        }

        var result = await _staffRepository.Add(newStaff);
        return result;
    }

    public async Task<Staff> UpdateStaff(Staff updated)
    {

        return await _staffRepository.UpdateStaff(updated);
    }


   /** public async Task<List<StaffDTO>> SearchStaff(
     string name,
     string email,
     string specializationCode,
     int page,
     int pageSize)
    {
        var query = _staffRepository.QueryAllStaff();

        // Apply filters based on input values
        if (!string.IsNullOrWhiteSpace(name))
        {
            query = query.Where(s => s.FirstName.Value.Contains(name) || s.LastName.Value.Contains(name));
        }

        if (!string.IsNullOrWhiteSpace(email))
        {
            query = query.Where(s => s.Email.Address.Contains(email));
        }

        if (!string.IsNullOrWhiteSpace(specialization))
        {
            query = query.Where(s => s.Specialization.Name.Contains(specialization));
        }

        // Apply pagination
        query = query.Skip((page - 1) * pageSize).Take(pageSize);


        var staffList = query
            .ToList();

        // Execute query and convert into DTO
        var staffDtoList = staffList.Select(s => new StaffDTO
        {
            Id = s.Id.Value,
            FirstName = s.FirstName.Value,
            LastName = s.LastName.Value,
            Email = s.Email.Address,
            PhoneNumber = s.PhoneNumber.Number,
            SpecializationCode = s.SpecializationCode.Code,
            // Map other properties as needed
        }).ToList();

        return staffDtoList; ;
    }

*/

    public bool isEmailUnique(string email)
    {
        return _staffRepository.isEmailUnique(email);
    }

    public bool isPhoneNumberUnique(string phoneNumber)
    {
        return _staffRepository.isPhoneNumberUnique(phoneNumber);
    }

    public StaffId GenerateStaffId(string email)
    {
        User user = _userRepository.getByEmailAsync(email).Result;
        Role userRole = Role.Doctor;
        if (user != null)
        {
            userRole = user.Role;
        }

        DateTime today = DateTime.Today;

        Staff lastStaff = _staffRepository.getLatestRecord(userRole, today);

        string nextSeqNum;

        if (lastStaff != null)
        {
            StaffId lastId = lastStaff.Id;
            string lastSeqNum = getSequenceNumberFromId(lastId);
            nextSeqNum = incrementSequenceNumber(lastSeqNum);

        }
        else
        {

            nextSeqNum = "00001";
        }

        return StaffId.GenerateId(userRole, today, nextSeqNum);
    }

    private static string getSequenceNumberFromId(StaffId id)
    {
        return id.Value.Substring(id.Value.Length - 5);
    }

    private static string incrementSequenceNumber(string sequenceNumber)
    {
        int number = Int32.Parse(sequenceNumber);
        number++;
        if (number > 99999)
        {
            throw new Exception("Sequence number limit reached");
        }
        return number.ToString().PadLeft(5, '0');
    }

    public bool CheckStaff(string id)
    {
        var staffId = new StaffId(id);
        return _staffRepository.StaffExists(staffId);


    }

    public List<Specialization> GetSpecializations()
    {
        return _specializationService.GetAllSpecializationsAsync().Result.ToList();
    }

}