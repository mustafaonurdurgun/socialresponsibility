using Infrastructure.Data.Postgres.Repositories.Interface;

namespace Infrastructure.Data.Postgres;

public interface IUnitOfWork : IDisposable
{
    IUserRepository Users { get; }
    IUserTokenRepository UserTokens { get; }
    ICategoryRepository Categories { get; }
    ICommentRepository Comments { get; }
    ICommentLikeRepository CommentLikes { get; }
    IEventRepository Events { get; }
    IEventParticipantRepository EventParticipants { get; }

    Task<int> CommitAsync();
}