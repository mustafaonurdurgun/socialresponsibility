using Infrastructure.Data.Postgres.Entities.Base;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Postgres.Entities
{
    public class Category:Entity<int>
    {
        public string CategoryName { get; set; } = default!;
        public IList<Event> Events { get; set; }

        
    }
}
