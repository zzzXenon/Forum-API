class GetThreadDetailUseCase {
  constructor({ threadRepository, commentRepository, replyRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
    this._replyRepository = replyRepository;
  }

  async execute(useCasePayload) {
    const { threadId } = useCasePayload;
    const thread = await this._threadRepository.getThreadDetailById(threadId);
    const comments = await this._commentRepository.getCommentsByThreadId(
      threadId
    );
    const commentsWithReplies = await Promise.all(
      comments.map(async (comment) => {
        const replies = await this._replyRepository.getRepliesByCommentId(
          comment.id
        );
        const formattedReplies = replies.map((reply) => ({
          id: reply.id,
          content: reply.is_delete
            ? "**balasan telah dihapus**"
            : reply.content,
          date: reply.date,
          username: reply.username,
        }));
        return {
          id: comment.id,
          username: comment.username,
          date: comment.date,
          content: comment.is_delete
            ? "**komentar telah dihapus**"
            : comment.content,
          replies: formattedReplies,
        };
      })
    );
    return { ...thread, comments: commentsWithReplies };
  }
}

module.exports = GetThreadDetailUseCase;
