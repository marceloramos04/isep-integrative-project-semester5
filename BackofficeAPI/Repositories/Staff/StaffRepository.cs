namespace Backoffice.Repositories.Staff;

using System.ComponentModel;
using System.Diagnostics;
using Backoffice.Models;
using Backoffice.Models.Domain.Roots;
using Backoffice.Models.Domain.Entities;
using Backoffice.Models.Domain.ValueObjects;
using Microsoft.EntityFrameworkCore;

public class StaffRepository : IStaffRepository
{

    private BackofficeContext _dbContext;

    public StaffRepository(BackofficeContext dbContext)
    {
        _dbContext = dbContext;
    }

    // Task<TEntity> GetByIdAsync(TEntityId id)
    // Task<IEnumerable<TEntity>> GetAllAsync()

    public bool StaffExists(StaffId id)
    {
        var result= _dbContext.Staff
            .Any(e => e.Id == id);

        return result;
    }

    public async Task<IEnumerable<Staff>> getAllStaff()
    {
        var result = await _dbContext.Staff
            //.AsNoTracking()
            .Select(x => x)
            .ToListAsync();

        return result;
    }

        // Returns Staffs as an IQueryable 
         public IQueryable<Staff> QueryAllStaff()
        {
            return _dbContext.Staff.AsQueryable();
        }
   




    public async Task<Staff> GetStaff(StaffId id)
    {
        var staff = await _dbContext.Staff.FindAsync(id);
        if (staff == null)
        {
            return null;
        }

        return staff;
    }

    public async Task<Staff> UpdateStaff(Staff staff)
    {
        // var existingEntity = await _dbContext.Staff.FindAsync(staff.Id);
        // if (existingEntity != null)
        // {
        //     _dbContext.Entry(existingEntity).State = EntityState.Detached;
        // }
        //CheckTracking(staff.Id);
        if (!StaffExists(staff.Id))
        {
            throw new Exception("Staff doesn't exist");
        }
        _dbContext.Staff.Update(staff);
        await _dbContext.SaveChangesAsync();
        return staff;
    }

    public async Task<Staff> Add(Staff staff)
    {
        staff = _dbContext.Staff.Add(staff).Entity;
        await _dbContext.SaveChangesAsync();
        return staff;
    }

    public Staff getLatestRecord(Role role, DateTime date)
    {
        string rolePrefix;

        switch (role.Name)
        {
            case Role.DOCTOR:
                rolePrefix = "D";
                break;
            case Role.NURSE:
                rolePrefix = "N";
                break;
            default:
                rolePrefix = "O";
                break;
        }
        string roleAndDate = rolePrefix + date.Year;

        Staff staff = _dbContext.Staff
            //.AsNoTracking()
            .Where(s => s.Id.Value.StartsWith(roleAndDate))
            .OrderByDescending(s => s.Id)
            .FirstOrDefault();

        if (staff == null)
        {
            return null;
        }
        
        CheckTracking(staff.Id);
        return staff;
    }

    public bool isEmailUnique(string email)
    {
        var result = _dbContext.Staff
            //.AsNoTracking()
            .Where(s => s.Email.Address == email)
            .Count() == 0;

        return result;
    }

    public bool isPhoneNumberUnique(string phoneNumber)
    {
        return _dbContext.Staff
            //.AsNoTracking()
            .Where(s => s.PhoneNumber.Number == phoneNumber)
            .Count() == 0;
    }

    // Task UpdateAsync(TEntity entity)
    // Task DeleteAsync(TEntity entity)


    public void CheckTracking(StaffId staffId)
    {
        var trackedEntity = _dbContext.ChangeTracker.Entries<Staff>()
            .FirstOrDefault(e => e.Entity.Id == staffId);

        if (trackedEntity != null)
        {
            // Detach the existing entity
            _dbContext.Entry(trackedEntity.Entity).State = EntityState.Detached;
            //throw new Exception("Entity is being tracked");
        }
    }
}