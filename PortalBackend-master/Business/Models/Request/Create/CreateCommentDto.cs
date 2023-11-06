using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models.Request.Create
{
    public class CreateCommentDto
    {
      
        public string Description { get; set; } = default!;
        //public int LikeCount { get; set; } = 0;
        public int EventId { get; set; } = default!;
        public int UserId { get; set; } = default!;
    }
}
