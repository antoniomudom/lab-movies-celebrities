// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model.js")
const Celebrities = require("../models/Celebrity.model.js")

// all your routes here

router.get("/create", (req, res, next) => {
    Celebrities.find()
    .select({name:1})
    .then((response)=>{

        res.render("movies/new-movie.hbs",{
            allCelebrities:response

        })


    })
    .catch((error)=>{
        next(error)
    })

   
    })
    
    
    //POST =>Send the data from the form to this route to create the celebrity and save it to the database
router.post("/create-movie", (req, res, next) => {
    
        Movie.create({
            title: req.body.title,
            genre: req.body.genre,
            plot: req.body.plot,
            cast:req.body.cast
          })
          .then((response) => {
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
    
    router.get("/", (req, res, next) => {
        Movie.find()
        .select({title:1})
        .then((response)=>{
            console.log(response)
            res.render("movies/movies.hbs",{
              allMovies: response
            })
        
          })
          .catch((error)=>{
            next(error)
        
          })
    
        
        })

        router.get("/:movieId/details",(req,res,next)=>{
            //hemos borrado el /book porque lo hemos puesto en el router.use de la index.routes.js
          
            //   const movieId=req.params.movieId;//hay que llamarlo igual que pusimos en la ruta
             const {movieId}=req.params
            console.log(movieId)
              Movie.findById(movieId)
              .populate("cast")
              .then((response)=>{
                console.log(response)
                res.render("movies/movie-details.hbs",{
                  oneMovie:response
                })
            
              })
              .catch((error)=>{
                next(error)
            
              })
            
              
            })
    // //GET => Show a form to edit a movie
    // router.get("", (req, res, next) => {
    
    //     res.render("")
    //     })
    // //POST=>Send the data from the form to this route to update the specific movie
    // router.post("/", (req, res, next) => {
    
    //     res.render("")
    //     })

    
    

module.exports = router;