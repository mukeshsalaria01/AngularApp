using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Models
{
    [Table("Customers")]
    public class CustomerModel
    {
        [Key]
        public int CustomerId { get; set; }

        [MaxLength(100)]
        [Required(ErrorMessage ="First name is required")]
        public string FirstName { get; set; }

        [MaxLength(100)]
        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; }

       
        [DataType(DataType.PhoneNumber)]
        [RegularExpression(@"^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$", ErrorMessage = "Not a valid phone number")]
        public string MobileNumber { get; set; }

        [Required]
        [RegularExpression("^[a-zA-Z0-9_\\.-]+@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$", ErrorMessage = "E-mail is not valid")]
        public string Email { get; set; }


        [MaxLength(300)]
        public string Address { get; set; }


    }
}
