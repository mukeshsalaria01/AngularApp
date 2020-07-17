using EmployeeManagementSystem.Interface;
using EmployeeManagementSystem.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Repositroy
{
    public class CustomerService : ICustomerService
    {
        private readonly AppDbContext _context;
        public CustomerService(AppDbContext context)
        {
            _context = context;
        }

        public void Add(CustomerModel customer)
        {
            _context.Customers.Add(customer);
        }

        public void Delete(int customerid)
        {
            var employeeData = _context.Customers.AsQueryable().Where(x => x.CustomerId == customerid).FirstOrDefault();
            _context.Entry(employeeData).State = EntityState.Deleted;
        }

        public IEnumerable<CustomerModel> GetAll()
        {
            return _context.Customers.ToList();
        }

        public IEnumerable<CustomerModel> GetById(int? customerid)
        {
            return _context.Customers.AsQueryable().Where(x => x.CustomerId == customerid).ToList();
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public void Update(CustomerModel customer)
        {
            _context.Entry(customer).State = EntityState.Modified;
        }
    }
}
