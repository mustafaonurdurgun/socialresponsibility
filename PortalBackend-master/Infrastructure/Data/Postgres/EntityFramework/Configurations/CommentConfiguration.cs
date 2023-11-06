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
    public class CommentConfiguration : BaseConfiguration<Comment, int>
    {
        public override void Configure(EntityTypeBuilder<Comment> builder)
        {
            base.Configure(builder);
            builder.Property(c => c.Description).IsRequired();

            builder.HasOne(c => c.Event)
                .WithMany(e => e.Comments)
                .HasForeignKey(c=>c.EventId);
           
            builder.HasOne(c=>c.User)
                .WithMany(u=>u.Comments)
                .HasForeignKey(c=>c.UserId);

            builder.HasMany(c => c.CommentLikes)
                .WithOne(cL => cL.Comment)
                .HasForeignKey(cL=>cL.CommentId);
        }
    }
}
