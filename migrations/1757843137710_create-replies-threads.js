exports.up = (pgm) => {
  pgm.createTable("replies", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    comment_id: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    owner: {
      type: "VARCHAR(50)",
      notNull: true,
    },
    content: {
      type: "TEXT",
      notNull: true,
    },
    is_delete: {
      type: "BOOLEAN",
      notNull: true,
      default: false,
    },
    date: {
      type: "TIMESTAMPTZ",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.addConstraint(
    "replies",
    "fk_replies.comment_id_comments.id",
    "FOREIGN KEY(comment_id) REFERENCES comments(id) ON DELETE CASCADE"
  );
  pgm.addConstraint(
    "replies",
    "fk_replies.owner_users.id",
    "FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE"
  );
};

exports.down = (pgm) => {
  pgm.dropTable("replies");
};
