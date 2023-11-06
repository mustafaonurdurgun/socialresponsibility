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
   public class CommentLikeRepository : Repository<CommentLike, int>, ICommentLikeRepository
    {
        public CommentLikeRepository(PostgresContext postgresContext) : base(postgresContext)
        {
        }
		public async Task<IList<CommentLike>> GetAllAsync(Expression<Func<CommentLike, bool>>? filter = null)
		{
			IQueryable<CommentLike> CommentQuery = PostgresContext.Set<CommentLike>();

			if (filter != null)
			{
				CommentQuery = CommentQuery.Where(filter);
			}

			//İlişkiler arasındaki iletişimi sağlar
			var Comment = await CommentQuery
				.Include(c => c.User)
				.Include(c => c.Comment)

				.ToListAsync();

			return Comment;
		}
	}
}
