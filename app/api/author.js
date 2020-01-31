module.exports = (app, db) => {
    app.post('/author', async (req, res) => {
      const author = new db.Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName
      })
      await author.save().then( (result) => res.json(result))
    })
  
    app.get('/authors', async (req, res) => {
      await db.Author.find(
        {}
      ).then((result) => {
        return res.json(result)
      })
    })
  }