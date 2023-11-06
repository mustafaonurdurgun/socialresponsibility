using Infrastructure.Data.Postgres.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models.Response
{
    public class CommentInfoDto
    {
        public int Id { get; set; }
        public string Description { get; set; } = default!;
        //public int LikeCount { get; set; } = 0;
        public int EventId { get; set; }
        public int UserId { get; set; }
        public EventInfoDto Event { get; set; }
        public UserProfileDto User { get; set; }
    }
}
