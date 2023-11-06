using Infrastructure.Data.Postgres.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models.Response
{
    public class EventInfoDto
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string ImagePath { get; set; } = default!;
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public DateTime StartDate { get; set; } = default!;
        public DateTime FinishDate { get; set; } = default!;
        public bool IsActive { get; set; } = true;
        public int CreatorId { get; set; }
		public byte Limit { get; set; } = default!;

		public CategoryInfoDto Category { get; set; }
        public UserProfileDto Creator { get; set; }

		
           
    }
}
