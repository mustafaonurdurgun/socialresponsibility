using Infrastructure.Data.Postgres.Entities;
using Infrastructure.Data.Postgres.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core;
namespace Infrastructure
{
	public class Seed
	{
		private readonly PostgresContext _context;

		public Seed(PostgresContext context)
		{
			_context = context;
		}
		public void SeedDataContext()
		{
			if(!_context.Categories.Any())
			{
				var categories = new List<Category>()
				{
					new Category { CategoryName="Yaşlılar için etkinlikler"},
					new Category { CategoryName="Çocuklar için etkinlikler"},
					new Category { CategoryName="Hayvanlar için etkinlikler"},
					new Category { CategoryName="Doğa için etkinlikler"}
				};
				_context.Categories.AddRange(categories);
				_context.SaveChanges();
			}

			if(!_context.Users.Any())
			{
				CreatePasswordHash("12345678",out byte[] passHash,out byte[] passSalt);
				var users = new List<User>()
	   {
			new User
			{
				Email = "ilkersenel5797@gmail.com",
				UserName = "ilkersenel",
				FullName = "İlker Şenel",
				Phone = "05343053092",
				ImagePath = "user1.jpg",
				IsMale = true,
				PasswordSalt = passHash,
				PasswordHash = passSalt,
				UserType = UserType.Admin
			},
			new User
			{
				Email = "user2@example.com",
				UserName = "gorkemirk",
				FullName = "Görkem Irk",
				Phone = "9876543210",
				ImagePath = "user2.jpg",
				IsMale = false,
				PasswordSalt = passHash,
				PasswordHash = passSalt,
				UserType = UserType.Admin
			},
			new User
			{
				Email = "user3@example.com",
				UserName = "tubaYazici",
				FullName = "Tubanur Yazıcı",
				Phone = "5555555555",
				ImagePath = "user3.jpg",
				IsMale = true,
				PasswordSalt = passHash,
				PasswordHash = passSalt,
				UserType = UserType.Admin
			}
		};
				_context.Users.AddRange(users);
				_context.SaveChanges();
			}
		}
		public void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
		{
			using (var hmac = new System.Security.Cryptography.HMACSHA512())
			{
				passwordSalt = hmac.Key;
				passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
			}
		}

	}
}
