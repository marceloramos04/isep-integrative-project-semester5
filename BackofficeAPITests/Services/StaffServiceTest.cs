using Backoffice.Repositories.User;
using Backoffice.Repositories.Staff;
using Backoffice.Models.Domain.Entities;
using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.Domain.Roots;
using Moq;
using Backoffice.Services.Staff;

namespace BackofficeAPITests.Services;

public class StaffServiceTest
{

    // Mock<IUserRepository> mockUserRepository = new Mock<IUserRepository>();
    // Mock<IStaffRepository> mockStaffRepository = new Mock<IStaffRepository>();

    // User u1 = new User
    // {
    //     Username = new Username("user1"),
    //     Email = new Email("user1@email.com"),
    //     Role = Role.Doctor
    // };
    // User u2 = new User
    // {
    //     Username = new Username("user2"),
    //     Email = new Email("user2@email.com"),
    //     Role = Role.Nurse
    // };
    // User u3 = new User
    // {
    //     Username = new Username("user3"),
    //     Email = new Email("user3@email.com"),
    //     Role = Role.Admin
    // };
    // User u4 = new User
    // {
    //     Username = new Username("user4"),
    //     Email = new Email("user4@email.com"),
    //     Role = Role.Technician
    // };

    // Staff s1 = new Staff
    // {
    //     Id = new StaffId("D202400001"),
    // };
    // Staff s2 = new Staff
    // {
    //     Id = new StaffId("N202400001"),
    // };
    // Staff s3 = new Staff
    // {
    //     Id = new StaffId("O202400001"),
    // };
    // Staff s4 = new Staff
    // {
    //     Id = new StaffId("O202400002"),
    // };

    // [Fact]
    // void CheckStaffServiceGeneratesNextIdCorrectly()
    // {
    //     mockUserRepository.Setup(x => x.getByEmailAsync(u1.Email.Address)).Returns(new Task<User>(() => u1));
    //     mockUserRepository.Setup(x => x.getByEmailAsync(u2.Email.Address)).Returns(new Task<User>(() => u2));
    //     mockUserRepository.Setup(x => x.getByEmailAsync(u3.Email.Address)).Returns(new Task<User>(() => u3));
    //     mockUserRepository.Setup(x => x.getByEmailAsync(u4.Email.Address)).Returns(new Task<User>(() => u4));

    //     mockStaffRepository.Setup(x => x.getLatestRecord(u1.Role, DateTime.Today)).Returns(s1);
    //     mockStaffRepository.Setup(x => x.getLatestRecord(u2.Role, DateTime.Today)).Returns(s2);
    //     mockStaffRepository.Setup(x => x.getLatestRecord(u3.Role, DateTime.Today)).Returns(s3);
    //     mockStaffRepository.Setup(x => x.getLatestRecord(u4.Role, DateTime.Today)).Returns(s4);

    //     StaffService staffService = new StaffService(mockStaffRepository.Object, mockUserRepository.Object);
        
    //     StaffId nextId1 = staffService.GenerateStaffId(u1.Email.Address);
    //     StaffId nextId2 = staffService.GenerateStaffId(u2.Email.Address);
    //     StaffId nextId3 = staffService.GenerateStaffId(u3.Email.Address);
    //     StaffId nextId4 = staffService.GenerateStaffId(u4.Email.Address);

    //     Assert.Equal("D202400002", nextId1.Value);
    //     Assert.Equal("N202400002", nextId2.Value);
    //     Assert.Equal("O202400002", nextId3.Value);
    //     Assert.Equal("O202400003", nextId4.Value);
    // }

}