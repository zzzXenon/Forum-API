const AddedComment = require('../AddedComment');

describe('AddedComment', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      content: 'sebuah komentar',
      owner: 'user-123',
    };

    // Action & Assert
    expect(() => new AddedComment(payload)).toThrow('ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 123,
      content: true,
      owner: {},
    };

    // Action & Assert
    expect(() => new AddedComment(payload)).toThrow('ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create AddedComment object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      content: 'sebuah komentar',
      owner: 'user-123',
    };

    // Action
    const addedComment = new AddedComment(payload);

    // Assert
    expect(addedComment.id).toEqual(payload.id);
    expect(addedComment.content).toEqual(payload.content);
    expect(addedComment.owner).toEqual(payload.owner);
  });
});