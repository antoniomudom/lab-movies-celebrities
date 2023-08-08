// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model.js")
const Celebrity = require("../models/Celebrity.model.js")


// all your routes here

//GET =>Show a form to create a celebrity

router.get("/create", (req, res, next) => {

res.render("celebrities/new-celebrity.hbs")
})


//POST =>Send the data from the form to this route to create the celebrity and save it to the database
router.post("/create-celebrity", (req, res, next) => {

    Celebrity.create({
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
      })
      .then(() => {
        console.log("celebrity creada")
        // ???
        // quiero que el usuario vaya a otra pagina cuando esto ocurra
        // res.redirect("/book")
        res.redirect(`/celebrity/${response._id}/details`)
    
      })
      .catch((error) => {
        next(error)
      })

    
})

//GET =>Show all celebrities

router.get("/celebrities", (req, res, next) => {

    res.render("celebrities/celebrities.hbs")
    })



module.exports = router;