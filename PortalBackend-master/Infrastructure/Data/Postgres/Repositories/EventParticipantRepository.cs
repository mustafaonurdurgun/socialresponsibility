using Infrastructure.Data.Postgres.Entities;
using Infrastructure.Data.Postgres.EntityFramework;
using Infrastructure.Data.Postgres.Repositories.Base;
using Infrastructure.Data.Postgres.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Postgres.Repositories
{
    public class EventParticipantRepository : Repository<EventParticipant,int>,IEventParticipantRepository
    {
        public EventParticipantRepository(PostgresContext postgresContext):base(postgresContext)
        {
                
        }

		public async Task<IList<EventParticipant>> GetAllAsync(Expression<Func<EventParticipant, bool>>? filter = null)
		{
			IQueryable<EventParticipant> ePQuery = PostgresContext.Set<EventParticipant>();

			if (filter != null)
			{
				ePQuery = ePQuery.Where(filter);
			}

			//İlişkiler arasındaki iletişimi sağlar
			var eP = await ePQuery
				.Include(eP => eP.User)
				.Include(eP=>eP.Event)
				.Include(eP=>eP.Event.Category)
		
				

				.ToListAsync();

			return eP;
		}
	}
}
