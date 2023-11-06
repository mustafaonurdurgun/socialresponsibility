using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models.Request.Create
{
    public class CreateEventDto
    {
        
        public int CategoryId { get; set; } = default!;
        public string ImagePath { get; set; } = default!;
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public DateTime StartDate { get; set; } = default!;
        public DateTime FinishDate { get; set; } = default!;
        //public bool IsActive { get; set; } = true;
        public int CreatorId { get; set; } = default!;
        public byte Limit { get; set; } = default!;
    }
}
