using Backoffice.Models;
using Backoffice.Models.Domain.Entities;
using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.Domain.Roots;

namespace BackofficeAPITests.IntegrationTests.Helpers;

public static class Utilities
{
    // public static void InitializeDbForTests(BackofficeContext db)
    // {
    //     db.Staff.AddRange(GetSeedingStaff());
    //     db.SaveChanges();
    // }

    // public static void ReinitializeDbForTests(BackofficeContext db)
    // {
    //     //db.Staff.RemoveRange(db.Staff);
    //     db.ChangeTracker.Clear(); // Clear the change tracker to avoid tracking issues
    //     db.Database.EnsureDeleted(); // Ensure the database is deleted
    //     db.Database.EnsureCreated(); // Ensure the database is created
    //     InitializeDbForTests(db);
    // }

    // public static List<Staff> GetSeedingStaff()
    // {
    //     return new List<Staff>()
    //     {
    //         new Staff(
    //             new StaffId("D202400001"),
    //             new FirstName("John"),
    //             new LastName("Doe"),
    //             new LicenseNumber("123456"),
    //             new Specialization("General"),
    //             new Email("johndoe@email.com"),
    //             new PhoneNumber("1111111")
    //         ),
            
    //         new Staff(
    //             new StaffId("N202400123"),
    //             new FirstName("Jane"),
    //             new LastName("Doe"),
    //             new LicenseNumber("987654"),
    //             new Specialization("General"),
    //             new Email("janedoe@email.com"),
    //             new PhoneNumber("2222222")
    //         ),

    //         new Staff(
    //             new StaffId("O202400123"),
    //             new FirstName("Max"),
    //             new LastName("Doe"),
    //             new LicenseNumber("192837"),
    //             new Specialization("General"),
    //             new Email("maxdoe@email.com"),
    //             new PhoneNumber("3333333")
    //         )
    //     };
    // }
}
