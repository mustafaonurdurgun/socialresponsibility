using Business.Models.Request;
using Business.Models.Request.Functional;
using Business.Models.Response;
using Business.Services.Interface;
using Business.Utilities.Security.Auth.Jwt;
using Business.Utilities.Security.Auth.Jwt.Interface;
using Core.Results;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.AspNetCore.Server.IIS;
using Web.Controllers.Base;
using Web.Filters;

namespace Web.Controllers;

public class AuthController : BaseController
{
	private readonly IAuthService _authService;


	public AuthController(IAuthService authService, IHashingHelper hashingHelper)
	{
		_authService = authService;

	}




	[HttpPost]

	public async Task<ActionResult<DataResult<Token>>> Login([FromBody] LoginDto loginDto)
		=> await _authService.Login(loginDto);

	[HttpPost]
	public async Task<ActionResult<DataResult<Token>>> Register([FromBody] RegisterDto registerDto)
		=> await _authService.Register(registerDto);

	[HttpGet]

	public async Task<ActionResult<DataResult<UserProfileDto>>> GetProfileInfo()
		=> await _authService.GetUserProfileInfo();

	[HttpGet]
	public async Task<ActionResult<DataResult<Token>>> RefreshToken(string token)
		=> await _authService.RefreshToken(token);
}