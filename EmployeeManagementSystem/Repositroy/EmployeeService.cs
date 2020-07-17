using EmployeeManagementSystem.Interface;
using EmployeeManagementSystem.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Repositroy
{
    public class EmployeeService : IEmployeeService
    {
        private readonly AppDbContext _context;
        public EmployeeService(AppDbContext context)
        {
            _context = context;
        }

        


        public  void Add(EmployeeModel employee)
        {
            _context.Employees.Add(employee);
        }

        public  void Delete(int employeeid)
        {
            var employeeData = _context.Employees.AsQueryable().Where(x => x.EmployeeId == employeeid).FirstOrDefault();
             _context.Entry(employeeData).State = EntityState.Deleted;
        }


       


        public  IEnumerable<EmployeeModel> GetAll()
        {
            return  _context.Employees.ToList();

        }

        public  IEnumerable<EmployeeModel> GetById(int? employeeid)
        {
            return   _context.Employees.AsQueryable().Where(x => x.EmployeeId == employeeid).ToList();
        }

        public  void Save()
        {
             _context.SaveChanges();
        }

        public  void Update(EmployeeModel employee)
        {
             _context.Entry(employee).State = EntityState.Modified;

        }
    }
}
