using Infrastructure.Data.Postgres.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Postgres.Entities
{
    public class Event:Entity<int>
    {
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public string ImagePath { get; set; } = default;
        public string Title { get; set; } = default!;
        public string Description { get; set; } = default!;
        public DateTime StartDate { get; set; } = default!;
        public DateTime FinishDate { get; set; } = default!;
        public bool IsActive { get; set; } = true;


        public int CreatorId { get; set; }
        public User Creator { get; set; }
        public byte Limit { get; set; }= default!;
        public IList<EventParticipant> EventParticipants { get; set; }
        public IList<Comment> Comments { get; set; }
        public IList<User> Users { get; set; }//çokaçok
    }
}
