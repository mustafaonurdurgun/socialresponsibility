using Infrastructure.Data.Postgres.Entities;

namespace Business.Models.Response;

public class UserProfileDto
{
    public int Id { get; set; }
    public string Email { get; set; } = default!;
    public string UserName { get; set; } = default!;
    public string FullName { get; set; } = default!;
    public string Phone { get; set; } = default!;
    public string ImagePath { get; set; } = default!;
    public bool IsMale { get; set; } = default!;
    public UserType UserType { get; set; }
	
}