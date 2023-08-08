// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model.js");
const Celebrities = require("../models/Celebrity.model.js");

// all your routes here

router.get("/create", (req, res, next) => {
  Celebrities.find()
    .select({ name: 1 })
    .then((response) => {
      res.render("movies/new-movie.hbs", {
        allCelebrities: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});

//POST =>Send the data from the form to this route to create the celebrity and save it to the database
router.post("/create-movie", (req, res, next) => {
  Movie.create({
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  })
    .then((response) => {
      console.log("peli creada");
      // ???
      // quiero que el usuario vaya a otra pagina cuando esto ocurra
      // res.redirect("/book")
      res.redirect("/movies");
    })
    .catch((error) => {
      next(error);
    });
});

//GET =>Show all movies

router.get("/", (req, res, next) => {
  Movie.find()
    .select({ title: 1 })
    .then((response) => {
      console.log(response);
      res.render("movies/movies.hbs", {
        allMovies: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:movieId/details", (req, res, next) => {
  //hemos borrado el /book porque lo hemos puesto en el router.use de la index.routes.js

  //   const movieId=req.params.movieId;//hay que llamarlo igual que pusimos en la ruta
  const { movieId } = req.params;
  console.log(movieId);
  Movie.findById(movieId)
    .populate("cast")
    .then((response) => {
      console.log(response);
      res.render("movies/movie-details.hbs", {
        oneMovie: response,
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/:movieId/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.movieId);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

//iteraccion 10 get


//nos entra en editar hacemos los cambios y cuando le damos a actualizar sin sentido ninguno nos lleva a http://localhost:3000/movies//edit y no sabemos de donde ni xq



router.get("/:movieId/edit", async (req, res, next) => {

  try {
    
    const response = await Movie.findById(req.params.movieId)
    const allCelebrities = await Celebrities.find().select({name: 1})

    const cloneAllCelebrities = JSON.parse( JSON.stringify(allCelebrities) )
    // clonamos el arr porque los array de documentos, mongo a veces no nos permite modificarlos

    console.log(response)
    cloneAllCelebrities.forEach((eachCelebrity) => {
      if (response.cast.toString() === eachCelebrity._id.toString()) {
        console.log("el seleccionado es:", eachCelebrity)
        eachCelebrity.isSelected = true;
      }
    })
    console.log(cloneAllCelebrities)

    res.render("movies/edit-movie.hbs", {
       response,
      allCelebrities: cloneAllCelebrities
    })
  } catch (error) {
    next(error)
  }

})

router.post("/:movieId/edit", (req, res, next) => {

  const movieId = req.params.moviesId
  const {title, genre, plot, cast} = req.body
  
  Movie.findByIdAndUpdate(movieId, {
      title,
      genre,
      plot,
      cast
  })
  .then(() => {
  res.redirect("/movies")
  })
  .catch((error) => {
      next(error)
  })
})



module.exports = router;
