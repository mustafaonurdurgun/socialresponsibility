using Infrastructure.Data.Postgres.Entities;
using Infrastructure.Data.Postgres.EntityFramework;
using Infrastructure.Data.Postgres.Repositories.Base;
using Infrastructure.Data.Postgres.Repositories.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Postgres.Repositories
{
    public class EventRepository : Repository<Event, int>, IEventRepository
    {
        public EventRepository(PostgresContext postgresContext) : base(postgresContext)
        {
			
		}
		public async Task<IList<Event>> GetAllAsync(Expression<Func<Event, bool>>? filter = null)
		{
			IQueryable<Event> eventsQuery = PostgresContext.Set<Event>();

			if (filter != null)
			{
				eventsQuery = eventsQuery.Where(filter);
			}

			//İlişkiler arasındaki iletişimi sağlar
			var events = await eventsQuery
				.Include(r => r.Category)
				.Include(r => r.Creator)
				
				.ToListAsync();

			return events;
		}
	}
}
