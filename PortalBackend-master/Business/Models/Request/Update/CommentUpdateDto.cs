using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models.Request.Update
{
    public class CommentUpdateDto
    {
        public string Description { get; set; } = default!;
        //public int LikeCount { get; set; } = 0;
        
    }
}
