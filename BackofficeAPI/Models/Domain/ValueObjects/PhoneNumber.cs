using System;
using System.Text.RegularExpressions;

namespace Backoffice.Models.Domain.ValueObjects
{
    public class PhoneNumber
    {
        public string Number { get; set;}
        private const string DIGITS_PATTERN = @"^\d+$";

        public PhoneNumber(string number)
        {
            if (string.IsNullOrWhiteSpace(number))
                throw new ArgumentException("Phone number cannot be empty or whitespace.", nameof(number));

            if (!CheckFormat(number))
                throw new ArgumentException("Phone number must contain only digits.", nameof(number));

            Number = number;
        }

        public override int GetHashCode()
        {
            return Number.GetHashCode();
        }

        public override string ToString()
        {
            return Number;
        }

        public static bool CheckFormat(string number)
        {
            return Regex.IsMatch(number, DIGITS_PATTERN);
        } 
    }
}