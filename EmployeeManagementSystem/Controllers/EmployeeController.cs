using EmployeeManagementSystem.Interface;
using EmployeeManagementSystem.Models;
using EmployeeManagementSystem.Models.DataTable;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;


namespace EmployeeManagementSystem.Controllers
{
    [Authorize]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeService _employeeService;
       
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        #region method
        /// <summary>
        /// get all employee list
        /// </summary>
        /// <returns></returns>

        [HttpPost]
        [Route("api/employee/getAllEmployee")]
        public IActionResult GetEmployee([FromBody]PagingRequest paging)
        {
            var pagingResponse = new PagingResponse()
            {
                Draw = paging.Draw
            };

          
                IQueryable<EmployeeModel> query = null;
                if (!string.IsNullOrEmpty(paging.SearchCriteria.Filter))
                {
                    query = _employeeService.GetAll().Where(emp => emp.EmployeeName.Contains(paging.SearchCriteria.Filter)).AsQueryable();
                }
                else if(!string.IsNullOrEmpty(paging.Search.Value))
                {
                    query = _employeeService.GetAll().Where(emp => emp.EmployeeName.Contains(paging.Search.Value) || emp.Position.Contains(paging.Search.Value)
                    || emp.Office.Contains(paging.Search.Value) || emp.Salary.ToString().Contains(paging.Search.Value)
                    ).AsQueryable();
                }
                else
                {
                    query = _employeeService.GetAll().AsQueryable();
                }
                var recordsTotal = query.Count();
                var colOrder = paging.Order[0];

                switch (colOrder.Column)
                {
                    case 0:
                        query = colOrder.Dir == "asc" ? query.OrderBy(emp => emp.EmployeeName) : query.OrderByDescending(emp => emp.EmployeeName);
                        break;
                    case 1:
                        query = colOrder.Dir == "asc" ? query.OrderBy(emp => emp.EmployeeName) : query.OrderByDescending(emp => emp.EmployeeName);
                        break;
                    case 2:
                        query = colOrder.Dir == "asc" ? query.OrderBy(emp => emp.Position) : query.OrderByDescending(emp => emp.Position);
                        break;
                    case 3:
                        query = colOrder.Dir == "asc" ? query.OrderBy(emp => emp.Office) : query.OrderByDescending(emp => emp.Office);
                        break;
                    case 4:
                        query = colOrder.Dir == "asc" ? query.OrderBy(emp => emp.Age) : query.OrderByDescending(emp => emp.Age);
                        break;
                    case 5:
                        query = colOrder.Dir == "asc" ? query.OrderBy(emp => emp.Salary) : query.OrderByDescending(emp => emp.Salary);
                        break;
                }

                pagingResponse.data = query.Skip(paging.Start).Take(paging.Length).ToArray();
                pagingResponse.RecordsTotal = recordsTotal;
                pagingResponse.RecordsFiltered = recordsTotal;
            
            return Ok(pagingResponse);
         
        }



        /// <summary>
        /// get employee by id
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/employee/getEmployeeById/{id}")]
        public IEnumerable<EmployeeModel> GetEmployeeById(int id)
        {
            return _employeeService.GetById(id);
        }


        /// <summary>
        /// save employee data
        /// </summary>
        /// <param name="employeeModel"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/employee/add")]
        public  IActionResult AddorEditEmployee([FromBody] EmployeeModel employeeModel)
        {
            bool status = false;
            string message = "Something Went Wrong!";

            if (!ModelState.IsValid)

                return Json(new { success = status, message = message });

            if (employeeModel.EmployeeId == 0)
            {
                 _employeeService.Add(employeeModel);
            }
            else
            {
                 _employeeService.Update(employeeModel);
            }
              _employeeService.Save();

            return Json(new { success = true, message = "Save Successfully" });
        }

        /// <summary>
        /// delete employee record
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("api/employee/delete/{id}")]
        public IActionResult Delete([FromRoute]int id)
        {
            bool status = false;
            string message = "Something Went Wrong!";
            if (id==0)
            {
                return Json(new { success = status, message = message });
            }
            _employeeService.Delete(id);
            _employeeService.Save();
            return Json(new { success = true, message = "Deleted Successfully" });
        }



        #endregion

    }
}