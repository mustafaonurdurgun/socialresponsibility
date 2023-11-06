using Business.Models.Request.Functional;
using Business.Models.Request.Update;
using Business.Models.Response;
using Business.Services.Interface;
using Core.Results;
using Infrastructure.Data.Postgres.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using Web.Controllers.Base;

namespace Web.Controllers
{
    public class UserController : BaseCRUDController<User, int, RegisterDto, UserUpdateDto, UserProfileDto>
    {
        IUserService _userService;
        public UserController(IUserService service) : base(service)
        {
            _userService = service;
        }
        [HttpPut]
		public virtual async Task<ActionResult<Result>> ChangePassword(ChangePasswordDto passwordDto)
		   => await _userService.ChangePasswordAsync(passwordDto);
	}
}
