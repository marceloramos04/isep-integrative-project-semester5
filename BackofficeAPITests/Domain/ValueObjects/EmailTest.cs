namespace BackofficeAPITests.Domain.ValueObjects;

using Backoffice.Models.Domain.ValueObjects;

public class EmailTest{

    [Theory]
    [InlineData("test@test.com")]
    [InlineData("test-test2@test.com")]
    [InlineData("test@test.test2.com")]
    void InstantiateEmailWithValidAddressSucceeds(string address){
        new Email(address);
    }


    [Theory]
    [InlineData("test@test")]
    [InlineData("test@test.")]
    [InlineData("test?!@test.com")]
    [InlineData("")]
    [InlineData("test@@test.com")]
    void InstantiateEmailWithInvalidAddressFails(string address){
         Assert.Throws<ArgumentException>(()=>new Email(address));
    }
}