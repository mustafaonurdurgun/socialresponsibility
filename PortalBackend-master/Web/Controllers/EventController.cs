using Business.Models.Request.Create;
using Business.Models.Request.Update;
using Business.Models.Response;
using Business.Services.Interface;
using Infrastructure.Data.Postgres.Entities;
using Web.Controllers.Base;

namespace Web.Controllers
{
    public class EventController : BaseCRUDController<Event, int, CreateEventDto, EventUpdateDto, EventInfoDto>
    {
        public EventController(IEventService service):base(service)
        {

        }
    }
}
