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
    public class EventConfiguration : BaseConfiguration<Event, int>
    {
        public override void Configure(EntityTypeBuilder<Event> builder)
        {
            base.Configure(builder);

            builder.Property(e => e.Description).IsRequired();
            builder.Property(e => e.ImagePath).IsRequired();
            builder.Property(e=>e.StartDate).IsRequired();
            builder.Property(e=>e.FinishDate).IsRequired();
            builder.Property(e=>e.Title).IsRequired();
            builder.Property(e=>e.Limit).IsRequired();

            builder.HasOne(e => e.Creator)
                .WithMany(u => u.CreatedEvents)
                .HasForeignKey(e => e.CreatorId);
            
            builder.HasOne(e=>e.Category)
                .WithMany(u => u.Events)
                .HasForeignKey(e=>e.CategoryId);

            //builder.HasMany(e => e.EventParticipants)
            //    .WithOne(eP => eP.Event)
            //    .HasForeignKey(eP=>eP.EventId);

            builder.HasMany(e => e.Comments)
                .WithOne(c => c.Event)
                .HasForeignKey(c=>c.EventId);

            builder.HasMany<User>(e => e.Users)
                .WithMany(u => u.AttendedEvents)
                .UsingEntity<EventParticipant>();
        }
    }
}
