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
      .then((response) => {
        console.log("celebrity creada")
        // ???
        // quiero que el usuario vaya a otra pagina cuando esto ocurra
        // res.redirect("/book")
        res.redirect(`/celebrities`)
    
      })
      .catch((error) => {
        console.log(error)
      })

    
})

//GET =>coger las celebrities de mongo y renderizarlas en celebrities.hbs


router.get("/", (req, res, next) => {
    Celebrity.find()
    .select({name:1})
    .then((response)=>{
        console.log(response)
        res.render("celebrities/celebrities.hbs",{
          allCelebrities: response
        })
    
        
      })
      .catch((error)=>{
        next(error)
    
      })

    
    })



module.exports = router;