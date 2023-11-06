using Infrastructure.Data.Postgres.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Postgres.Entities
{
    public class Comment:Entity<int>
    {
        public string Description { get; set; } = default!;
        //public int LikeCount { get; set; } = 0;
        public int EventId { get; set; }
        public Event Event { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        public IList<CommentLike> CommentLikes { get; set; }
    }
}
