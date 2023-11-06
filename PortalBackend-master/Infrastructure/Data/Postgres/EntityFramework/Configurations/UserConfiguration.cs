using Infrastructure.Data.Postgres.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Postgres.EntityFramework.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(x => x.Id);
        builder.Property(x => x.Email).IsRequired();
        builder.HasIndex(x => x.Email).IsUnique();
        builder.Property(x => x.UserName).IsRequired();
        builder.HasIndex(x => x.UserName).IsUnique();
        builder.Property(x => x.FullName).IsRequired();
        builder.Property(x => x.PasswordHash).IsRequired();
        builder.Property(x => x.PasswordSalt).IsRequired();
        builder.Property(x => x.CreatedAt).IsRequired();
        builder.Property(x => x.IsDeleted).IsRequired();
        builder.Property(x=>x.IsMale).IsRequired();
        builder.Property(x=>x.Phone).IsRequired();
        builder.Property(x=>x.ImagePath).IsRequired();


        builder.HasMany(u => u.CreatedEvents)
        .WithOne(e => e.Creator)
        .HasForeignKey(e => e.CreatorId);

        //builder.HasMany(u => u.EventParticipants)
        // .WithOne(eP => eP.User)
        // .HasForeignKey(eP => eP.UserId);

        builder.HasMany(u => u.Comments)
         .WithOne(c => c.User)
         .HasForeignKey(b => b.UserId);

        builder.HasMany(u => u.CommentLikes)
         .WithOne(cL => cL.User)
         .HasForeignKey(cL => cL.UserId);


        builder.HasMany<Event>(u => u.AttendedEvents)
            .WithMany(e => e.Users)
            .UsingEntity<EventParticipant>();
    }
}