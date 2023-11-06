using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models.Response
{
    public class CommentLikeInfoDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int CommentId { get; set; }
        public UserProfileDto User { get; set; }
        public CommentInfoDto Comment { get; set; }
    }
}
