using Infrastructure.Data.Postgres.Entities;
using Infrastructure.Data.Postgres.EntityFramework.Configurations.Base;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Postgres.EntityFramework.Configurations
{
    public class EventParticipantConfiguration : BaseConfiguration<EventParticipant, int>
    {
        public override void Configure(EntityTypeBuilder<EventParticipant> builder)
        {
            base.Configure(builder);
            builder.HasIndex(ep => new { ep.UserId, ep.EventId }).IsUnique();
            builder.HasOne(eP => eP.User)
                .WithMany(u => u.EventParticipants)
                .HasForeignKey(eP => eP.UserId);

            builder.HasOne(eP => eP.Event)
             .WithMany(e=>e.EventParticipants)
             .HasForeignKey(eP => eP.EventId);

        }
    }
}
