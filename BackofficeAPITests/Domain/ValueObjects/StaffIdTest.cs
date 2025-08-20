namespace BackofficeAPITests.Domain.ValueObjects;

using System;
using Backoffice.Models.Domain.ValueObjects;

public class StaffIdTest
{
    //private const string ID_PATTERN = @"^[DNO]\d{4}\d{5}$";

    [Theory]
    [InlineData("D202400001")]
    [InlineData("N202400123")]
    [InlineData("O202499999")]
    public void InstantiateStaffIdWithValidValueSucceeds(string id)
    {
        new StaffId(id);
    }

    [Theory]
    [InlineData("A202400001")]
    [InlineData("N2024001234")]
    [InlineData("O20249999")]
    public void InstantiateStaffIdWithInvalidValueFails(string id)
    {
        Assert.Throws<ArgumentException>(() => new StaffId(id));
    }

    [Theory]
    [InlineData("00001")]
    [InlineData("00123")]
    [InlineData("99999")]
    public void GenerateStaffIdwithValidSequentialNumberSucceeds(string validSequenceNumber)
    {
        Role role = Role.Doctor;
        DateTime date = new DateTime(2024, 1, 1);

        string rolePrefix = Role.Doctor.Name.Substring(0,1).ToUpper();
        string expectedId = rolePrefix + date.Year + validSequenceNumber;

        Assert.Equal(expectedId, StaffId.GenerateId(role, date, validSequenceNumber).Value);
    }

    [Theory]
    [InlineData("")]
    [InlineData("0000")]
    [InlineData("000001")]
    [InlineData("0000a")]
    public void GenerateStaffIdWithInvalidSequentialNumberFails(string invalidSequenceNumber)
    {
        Role role = Role.Doctor;
        DateTime date = new DateTime(2024, 1, 1);
        Assert.Throws<ArgumentException>(() => StaffId.GenerateId(role, date, invalidSequenceNumber));
    }
}