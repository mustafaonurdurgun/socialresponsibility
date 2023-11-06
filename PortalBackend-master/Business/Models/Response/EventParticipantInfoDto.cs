using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.Models.Response
{
    public class EventParticipantInfoDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int EventId { get; set; }
        public EventInfoDto Event { get; set; }
        public UserProfileDto User { get; set; }
    }
}
