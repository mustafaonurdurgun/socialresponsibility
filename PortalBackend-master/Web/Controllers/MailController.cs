using Core.Utilities.Mail;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Web.Models;

namespace YourNamespace.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class MailController : ControllerBase
	{
		private readonly IMailHelper _mailHelper;

		public MailController(IMailHelper mailHelper)
		{
			_mailHelper = mailHelper;
		}

		[HttpPost]
		public async Task<IActionResult> SendEmail([FromBody] EmailModel model)
			{
			try
			{
				// E-posta gönderme işlemini burada gerçekleştirin
				await _mailHelper.SendMailAsync(model.Subject, model.Body, model.Recepients);
				return Ok();
			}
			catch (Exception ex)
			{
				return BadRequest();
			}
		}
	}
}

