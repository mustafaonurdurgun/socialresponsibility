using Infrastructure.Data.Postgres.Entities.Base;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Data.Postgres.Entities;

public class User : Entity<int>
{
    public string Email { get; set; } = default!;
    public string UserName { get; set; } = default!;
    public string FullName { get; set; } = default!;
    public string Phone { get; set; } = default!;
    public string ImagePath { get; set; } = default!;
    public bool IsMale { get; set; } = default!;
    public byte[] PasswordSalt { get; set; } = default!;
    public byte[] PasswordHash { get; set; } = default!;
    public UserType UserType { get; set; } = UserType.Member;

    public IList<Event> CreatedEvents { get; set; }
    public IList<Event> AttendedEvents { get; set; }
    public IList<EventParticipant> EventParticipants { get; set; }
    public IList<Comment> Comments { get; set; }
    public IList<CommentLike> CommentLikes { get; set; }
}

public enum UserType
{
    Admin,
    Organizator,
    Member
}
