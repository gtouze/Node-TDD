module.exports = (app, db) => {
    app.post('/post', async (req, res) => {
      const post = new db.Post({
        title: req.body.title,
        content: req.body.content
      })
      await post.save().then( (result) => res.json(result))
    })
  }