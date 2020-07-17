using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Models
{
     [Table("Employees")]
     public class EmployeeModel
     {
        [Key]
        public int EmployeeId { get; set; }
        [Required]
        public string EmployeeName { get; set; }

        [Required]
        public string Position { get; set; }
        [Required]
        public string Office { get; set; }
        public Nullable<int> Age { get; set; }
        public Nullable<int> Salary { get; set; }
        [Required]
        public int RoleId { get; set; }
    }


}
