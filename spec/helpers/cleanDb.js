const cleanDb = async (db) => {
    // await db.Author.truncate({ cascade: true });
    // await db.Post.truncate({ cascade: true });
    await db.Post.deleteMany({});
    await db.Author.deleteMany({});

  }
  module.exports = cleanDb