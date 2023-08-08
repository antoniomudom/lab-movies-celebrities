// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model.js")
const Celebrities = require("../models/Celebrity.model.js")

// all your routes here

router.get("/create", (req, res, next) => {

    res.render("movies/new-movie.hbs")
    })
    
    
    //POST =>Send the data from the form to this route to create the celebrity and save it to the database
router.post("/create", (req, res, next) => {
    
        Movie.create({
            title: req.body.title,
            genre: req.body.genre,
            plot: req.body.plot,
            cast:req.body.cast
          })
          .then(() => {
            console.log("peli creada")
            // ???
            // quiero que el usuario vaya a otra pagina cuando esto ocurra
            // res.redirect("/book")
            res.redirect("/movies")
        
          })
          .catch((error) => {
            next(error)
          })
    
        
    })
    
    //GET =>Show all movies
    
    // router.get("/movies", (req, res, next) => {
    
    //     res.render("movies/movies.hbs")
    //     })

    // //GET => show a specific movie
    // router.get("", (req, res, next) => {
    //     // .findById()
    //     // .populate()
    
    //     res.render("")
    //     })
    // //POST => Delete a specific 
    // router.post("/", (req, res, next) => {
    
    //     res.render("")
    //     })
    // //GET => Show a form to edit a movie
    // router.get("", (req, res, next) => {
    
    //     res.render("")
    //     })
    // //POST=>Send the data from the form to this route to update the specific movie
    // router.post("/", (req, res, next) => {
    
    //     res.render("")
    //     })

    
    

module.exports = router;