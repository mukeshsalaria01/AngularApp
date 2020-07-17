using EmployeeManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Interface
{
    public interface ICustomerService
    {

        #region sync methods
        IEnumerable<CustomerModel> GetAll();
        IEnumerable<CustomerModel> GetById(int? customerid);

        void Add(CustomerModel customer);

        void Update(CustomerModel customer);

        void Delete(int customerid);

        void Save();
        #endregion
    }
}
