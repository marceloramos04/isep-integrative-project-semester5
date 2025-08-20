using System.Text.RegularExpressions;

namespace Backoffice.Models.Domain.ValueObjects
{
    public class Email
    {
        public string Address { get; set; }
        private const string ADDRESS_PATTERN = @"^([\w\.\-]+)@([\w\-]+)((\.(\w)+)+)$";

        public Email(string address)
        {
            address = address.Trim();
            if (string.IsNullOrWhiteSpace(address) || !CheckAddress(address))
                throw new ArgumentException("Invalid email address (at class Email)");

            Address = address;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Address);
        }

        public override string ToString()
        {
            return Address;
        }

        public static bool CheckAddress(string address){
            if (Regex.IsMatch(address, ADDRESS_PATTERN))
             return true;
            else throw new ArgumentException("Address '" + address + "' didn't match Email pattern (at class Email)");
        }
    }
}
