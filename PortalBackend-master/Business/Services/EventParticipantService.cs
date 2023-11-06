using Business.Models.Response;
using Business.Services.Base;
using Business.Services.Interface;
using Business.Utilities.Mapping.Interface;
using Core.Results;
using Infrastructure.Data.Postgres;
using Infrastructure.Data.Postgres.Entities;
using Org.BouncyCastle.Asn1.Ocsp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services
{
    public class EventParticipantService : BaseService<EventParticipant, int, EventParticipantInfoDto>, IEventParticipantService
    {
        public EventParticipantService(IUnitOfWork unitOfWork, IMapperHelper mapperHelper) : base(unitOfWork, unitOfWork.EventParticipants, mapperHelper)
        {
            
        }
    }
}
