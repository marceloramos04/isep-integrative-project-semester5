using System.ComponentModel.DataAnnotations;

public class OperationTypeDTO
{
    public long id { get; set; }

    [Required]
    public string name { get; set; }

    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Estimated duration must be at least 1 minute.")]
    public int estimatedDuration { get; set; }

    [Required]
    public List<RequiredStaffDTO> requiredStaff { get; set; }

    public string status { get; set; }

    public class RequiredStaffDTO
    {
        [Required]
        public string role { get; set; }

        [Required]
        public string specializationCode { get; set; }

        [Required]
        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]
        public int quantity { get; set; }
    }
}
