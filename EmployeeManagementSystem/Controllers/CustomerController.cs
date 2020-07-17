using EmployeeManagementSystem.Interface;
using EmployeeManagementSystem.Models;
using EmployeeManagementSystem.Models.DataTable;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic;

namespace EmployeeManagementSystem.Controllers
{

    [ApiController]
    public class CustomerController : Controller
    {

        private readonly ICustomerService  _customerService;

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        #region method


        [HttpPost]
        [Route("api/customer/getAllCustomer")]
        public IActionResult GetCustomer([FromBody]PagingRequest paging)
        {
            var pagingResponse = new PagingResponse()
            {
                Draw = paging.Draw
            };

            IQueryable<CustomerModel> query = null;
            if (!string.IsNullOrEmpty(paging.SearchCriteria.Filter))
            {
                query = _customerService.GetAll().Where(cust => cust.FirstName.Contains(paging.SearchCriteria.Filter)).AsQueryable();
            }
            else if (!string.IsNullOrEmpty(paging.Search.Value))
            {
                query = _customerService.GetAll().Where(cust => cust.FirstName.Contains(paging.Search.Value) || cust.LastName.Contains(paging.Search.Value)
                || cust.MobileNumber.Contains(paging.Search.Value) || cust.Email.ToString().Contains(paging.Search.Value)
                ).AsQueryable();
            }
            else
            {
                query = _customerService.GetAll().AsQueryable();
            }
            var recordsTotal = query.Count();
            var colOrder = paging.Order[0];

            switch (colOrder.Column)
            {
                case 0:
                    query = colOrder.Dir == "asc" ? query.OrderBy(emp => emp.FirstName) : query.OrderByDescending(emp => emp.FirstName);
                    break;
                case 1:
                    query = colOrder.Dir == "asc" ? query.OrderBy(emp => emp.FirstName) : query.OrderByDescending(emp => emp.FirstName);
                    break;
                case 2:
                    query = colOrder.Dir == "asc" ? query.OrderBy(emp => emp.LastName) : query.OrderByDescending(emp => emp.LastName);
                    break;
                case 3:
                    query = colOrder.Dir == "asc" ? query.OrderBy(emp => emp.MobileNumber) : query.OrderByDescending(emp => emp.MobileNumber);
                    break;
                case 4:
                    query = colOrder.Dir == "asc" ? query.OrderBy(emp => emp.Email) : query.OrderByDescending(emp => emp.Email);
                    break;
                case 5:
                    query = colOrder.Dir == "asc" ? query.OrderBy(emp => emp.Address) : query.OrderByDescending(emp => emp.Address);
                    break;
            }

            pagingResponse.data = query.Skip(paging.Start).Take(paging.Length).ToArray();
            pagingResponse.RecordsTotal = recordsTotal;
            pagingResponse.RecordsFiltered = recordsTotal;

            return Ok(pagingResponse);
        }



        /// <summary>
        /// get customer by id
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/customer/getCustomerById/{id}")]
        public IEnumerable<CustomerModel> GetCustomerById(int id)
        {
            return _customerService.GetById(id);
        }



        /// <summary>
        /// save employee data
        /// </summary>
        /// <param name="customerModel"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/customer/add")]
        public IActionResult AddorEditCsutomer([FromBody] CustomerModel customerModel)
        {
            bool status = false;
            string message = "Something Went Wrong!";

            if (!ModelState.IsValid)

                return Json(new { success = status, message = message });

            if (customerModel.CustomerId == 0)
            {
                _customerService.Add(customerModel);
            }
            else
            {
                _customerService.Update(customerModel);
            }
            _customerService.Save();

            return Json(new { success = true, message = "Save Successfully" });
        }


        /// <summary>
        /// delete employee record
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        [Route("api/customer/delete/{id}")]
        public IActionResult Delete([FromRoute]int id)
        {
            bool status = false;
            string message = "Something Went Wrong!";
            if (id == 0)
            {
                return Json(new { success = status, message = message });
            }
            _customerService.Delete(id);
            _customerService.Save();
            return Json(new { success = true, message = "Deleted Successfully" });
        }




        #endregion


    }
}