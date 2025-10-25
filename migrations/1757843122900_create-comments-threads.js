exports.up = (pgm) => {
  pgm.createTable("comments", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    thread_id: {
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
    "comments",
    "fk_comments.thread_id_threads.id",
    "FOREIGN KEY(thread_id) REFERENCES threads(id) ON DELETE CASCADE"
  );
  pgm.addConstraint(
    "comments",
    "fk_comments.owner_users.id",
    "FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE"
  );
};

exports.down = (pgm) => {
  pgm.dropTable("comments");
};
