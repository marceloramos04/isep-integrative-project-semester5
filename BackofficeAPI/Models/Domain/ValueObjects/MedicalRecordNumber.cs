using System;

namespace Backoffice.Models.Domain.ValueObjects
{
    public class MedicalRecordNumber : IComparable<MedicalRecordNumber>
    {
        public string Value { get; private set; }

        public MedicalRecordNumber(string value)
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new ArgumentException("Medical record number cannot be empty.", nameof(value));
            }

            Value = value;
        }

        public static MedicalRecordNumber Generate(int sequentialNumber)
        {
            var now = DateTime.UtcNow; 
               string formattedNumber = $"{now:yyyyMM}{sequentialNumber:D6}";
            return new MedicalRecordNumber(formattedNumber);
        }

        public override bool Equals(object? obj)
        {
            if (obj is MedicalRecordNumber other)
            {
                return Value == other.Value;
            }

            return false;
        }

        public override int GetHashCode()
        {
            return Value.GetHashCode();
        }

        public override string ToString()
        {
            return Value;
        }

        public int CompareTo(MedicalRecordNumber? other)
        {
            return Value.CompareTo(other?.Value);
        }
    }
}