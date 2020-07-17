using EmployeeManagementSystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Interface
{
    public interface IEmployeeService
    {
        #region sync methods
        IEnumerable<EmployeeModel> GetAll();
        IEnumerable<EmployeeModel> GetById(int? employeeid);

         void Add(EmployeeModel employee);

         void Update(EmployeeModel employee);

        void Delete(int employeeid);

        void Save();
        #endregion
    }
}
