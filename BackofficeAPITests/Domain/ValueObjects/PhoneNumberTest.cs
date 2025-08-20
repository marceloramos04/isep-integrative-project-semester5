namespace BackofficeAPITests.Domain.ValueObjects;
using Backoffice.Models.Domain.ValueObjects;
using System;
using Xunit;

public class PhoneexpectedNumberTest
{

    [Theory]
    [InlineData("1234567")]
    [InlineData("123456789")]
    [InlineData("12345679890")]
    [InlineData("12345679890")]
    void InstantiatePhoneNumberWithValidNumberSucceeds(string number)
    {
        new PhoneNumber(number);
    }

    [Theory]
    [InlineData("")]
    [InlineData("123456a")]
    [InlineData("aaaaaaa")]
    void InstantiatePhoneNumberWithInvalidNumberFails(string number)
    {
        Assert.Throws<ArgumentException>(() => new PhoneNumber(number));
    }

    [Theory]
    [InlineData("1234567")]
    [InlineData("123456789")]
    [InlineData("12345679890")]
    [InlineData("12345679890")]
    void CheckValidFormatSucceeds(string number)
    {
        Assert.True(PhoneNumber.CheckFormat(number));
    }

    [Theory]
    [InlineData("")]
    [InlineData("123456a")]
    [InlineData("aaaaaaa")]
    void CheckInvalidFormatFails(string number)
    {
        Assert.False(PhoneNumber.CheckFormat(number));
    }


}