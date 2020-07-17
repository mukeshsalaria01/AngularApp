using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Models
{
    public class AppDbContext : IdentityDbContext<IdentityUser>
    {
         public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
         {
              
         }

        public DbSet<EmployeeModel> Employees { get; set; }
        public DbSet<CustomerModel> Customers { get; set; }


    }
}
