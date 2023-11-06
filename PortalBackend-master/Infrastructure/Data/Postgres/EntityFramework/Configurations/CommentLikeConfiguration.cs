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
    public class CommentLikeConfiguration : BaseConfiguration<CommentLike, int>
    {
        public override void Configure(EntityTypeBuilder<CommentLike> builder)
        {
            base.Configure(builder);

            builder.HasOne(cL => cL.User)
                .WithMany(u => u.CommentLikes)
                .HasForeignKey(cL => cL.UserId);

            builder.HasOne(cL => cL.Comment)
               .WithMany(c => c.CommentLikes)
               .HasForeignKey(cL => cL.CommentId);
        }
    }
}
