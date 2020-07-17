using EmployeeManagementSystem.Models;
using EmployeeManagementSystem.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManagementSystem.Controllers
{
    [ApiController]
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly ApplicationSetting _appSetting;

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IOptions<ApplicationSetting> appSetting)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _appSetting = appSetting.Value;
        }

        #region method
        /// <summary>
        /// register user 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/account/register")]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            bool status = false;
            string message = "Email already exists.";
            if (ModelState.IsValid)
            {
                var userExists = await _userManager.FindByEmailAsync(model.Email);
                if (userExists != null)
                    return Json(new { success = status, message = message });

                IdentityUser user = new IdentityUser() { UserName = model.UserName, Email = model.Email, };

                var result = await _userManager.CreateAsync(user, model.Password);
                if (!result.Succeeded)
                    return Json(new { success = status, message = result.Errors.FirstOrDefault().Description });

                return Json(new { success = true, message = "Registration Successfull" });
            }
            return Json(new { success = status, message = "Registration failed" });
        }



        /// <summary>
        /// login user
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/account/login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            bool status = false;
            string message = string.Empty;
            if (ModelState.IsValid)
            {                
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                        new Claim("UserID",user.Id.ToString()),
                        new Claim("UserName",user.UserName),
                        new Claim ("Email",user.Email)
                        }),
                        Expires = DateTime.UtcNow.AddMinutes(60),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSetting.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                    var token = tokenHandler.WriteToken(securityToken);
                    return Json(new { success = true, message = "Login successfull", token = token });
                }
                else
                    return Json(new { success = status, message = "Invalid login attempt." });
            }
            return Json(new { success = status, message = ModelState});
        }

        /// <summary>
        /// get login info of user
        /// </summary>
        /// <returns></returns>

        [HttpGet]
        [Authorize]
        [Route("api/account/userProfile")]
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
                user.UserName,
                user.Email,
                user.Id
            };
        }





        #endregion

    }
}