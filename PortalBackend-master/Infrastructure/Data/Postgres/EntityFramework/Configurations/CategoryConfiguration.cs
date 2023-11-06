using Infrastructure.Data.Postgres.Entities;
using Infrastructure.Data.Postgres.EntityFramework.Configurations.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Infrastructure.Data.Postgres.EntityFramework.Configurations
{
    public class CategoryConfiguration : BaseConfiguration<Category, int>
    {
        public override void Configure(EntityTypeBuilder<Category> builder)
        {
            base.Configure(builder);
            builder.Property(b => b.CategoryName).IsRequired();


            builder.HasMany(c => c.Events)
                .WithOne(e => e.Category)
                .HasForeignKey(e => e.CategoryId);
        }

    }
}
