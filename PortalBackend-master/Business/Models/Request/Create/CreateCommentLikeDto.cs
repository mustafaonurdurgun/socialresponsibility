using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models.Request.Create
{
    public class CreateCommentLikeDto
    {
        public int UserId { get; set; }

        public int CommentId { get; set; }
    }
}
