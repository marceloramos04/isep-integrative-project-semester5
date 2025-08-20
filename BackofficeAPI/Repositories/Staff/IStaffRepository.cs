namespace Backoffice.Repositories.Staff;

using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.Domain.Entities;
using Backoffice.Models.Domain.Roots;

public interface IStaffRepository : IGenericRepository<Staff, StaffId>{
    
    public Task<Staff> GetStaff(StaffId id);
    public Task<Staff> UpdateStaff(Staff staff);
    Staff getLatestRecord(Role role, DateTime date);
    public bool isEmailUnique(string email);
    public bool isPhoneNumberUnique(string phoneNumber);
}