const MovieSchema = require('../models/Movie.js');
const Rating = require("../models/Rating.js");
const passport = require('passport')

module.exports.controller = (app) => {
//obtener todas las peliculas 
app.get('/movies', passport.authenticate('jwt', { session: false }),
 (req, res) => {
    MovieSchema.find({}, 'name description release_year genre', (error, movies) =>{
        if (error) { console.log(error); }
        res.send({
            movies,
        });
    });
});

//obtener una sola pelicula 
app.get('/api/movies/:id', (req, res) => {
    MovieSchema.findById(req.params.id, 'name description release_year genre',(error, movie) => {
        if (error) { console.error(error); }
        res.send(movie);
    });
});

//valorar una pelicula
app.post('/movies/rate/:id', (req, res) =>{
    const rating  = new Rating({
        movie_id: req.params.id,
        user_id: req.body.user_id,
        rate: req.body.rate,
    })

    rating.save(function (error, rating) {
        if (error) { console.log(error); }
        res.send({
            movie_id: rating.movie_id,
            user_id: rating.user_id,
            rate: rating.rate
        });
    });
});

//agregar una pelicula
    app.post('/movies', (req, res) => {
        const newMovie = new MovieSchema({
            name: req.body.name,
            description: req.body.description,
            release_year: req.body.release_year,
            genre: req.body.genre,
        });

        newMovie.save((error, movie) => {
            if (error) { console.log(error); }
            res.send(movie);
        });
    });
};  