using Business.Models.Response;
using Business.Services.Base.Interface;
using Business.Utilities.Mapping.Interface;
using Core.Results;
using Infrastructure.Data.Postgres;
using Infrastructure.Data.Postgres.Entities;
using Infrastructure.Data.Postgres.Repositories.Base.Interface;
using Org.BouncyCastle.Asn1.Ocsp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Business.Services.Interface
{
    public interface IEventParticipantService:IBaseService<EventParticipant,int,EventParticipantInfoDto>
    {
        
    }
}
