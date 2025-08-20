namespace BackofficeAPITests.Domain.Aggregates;

using Backoffice.Models.Domain.Entities;
using Backoffice.Models.Domain.ValueObjects;
using Backoffice.Models.Domain.Roots;

public class StaffTests
{
    [Theory]
    [InlineData("D202400001", "test@test.com", "1111111")]
    [InlineData("N202400123", "test2@test.test.com", "1111111")]
    [InlineData("O202400123", "test3-test@test.test.com", "1111111")]
    void InstiateStaffWtihValidValuesSucceeds(string id, string email, string phoneNumber)
    {
        new Staff(
            new StaffId(id),
            new FirstName("John"),
            new LastName("Doe"),
            new LicenseNumber("123456"),
            "00000",
            new Email(email),
            new PhoneNumber(phoneNumber)
        );
    }

    [Theory]
    [InlineData("D202400001a", "test@test.com", "1111111")]
    [InlineData("N202400123", "test2@test.test.", "1111111")]
    [InlineData("O202400123", "test3-test@test.test.com", "111111a")]
    void InstiateStaffWtihInvalidValuesFails(string id, string email, string phoneNumber)
    {
        Assert.Throws<ArgumentException>(() => new Staff(
            new StaffId(id),
            new FirstName("John"),
            new LastName("Doe"),
            new LicenseNumber("123456"),
            "00000",
            new Email(email),
            new PhoneNumber(phoneNumber))
        );
    }
}