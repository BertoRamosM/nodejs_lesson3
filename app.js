// here we are using commonJS
const express = require('express')
const movies = require('./movies.json')
const cripto = require('node:crypto')

const app = express()
app.use(express.json())

app.disable('x-powered-by')

//an endpoint its a path where we have an available resource
//all the resourses that are movies, we identify them with /movies

//in the query we can pass any params from the url thanks to express
app.get("/movies", (req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies);
});

//path-to-regexp library
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)
   
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
})

//create new movies, as every resource its identified with an url we use simply "/movies" and then the method defines the operation
app.post('/movies', (req, res) => {
  const {
    title,
    genre,
    year,
    director,
    duration,
    rate,
    poster
  } = req.body

  //we create the new object
  const newMovie = {
    //to add an id, we use crypto from nodejs
    //universal unique identifier
    id: crypto.randomUUID(),
    title,
    genre,
    year,
    director,
    duration,
    rate: rate ?? 0,
    poster
  }

  //this is not rest because we are saving the estate of the application in memory!!!!!!!!
  //instead we should add it to a db
  movies.push(newMovie)

  //201 means new resource created
  res.statusCode(201).json(newMovie)
})


const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening in port http://localhost:${PORT}`)
})

/* 
  REST: Software Architecture => (escalability, portability, simplicity, visibility, fiability, easy to modify)
  
  =>Resourses: in REST everything is a resource (user, post, image .... ) or a collection of it. 

  !!!Every resource its identified by an URL!!!

  =>Methods(verbs HTTP(get, post, put, delete,    patch ... ))
  To define the operations we can do with the resources 
  The basic CRUD (create, read, update and delete)


  =>Representation of the resource: its not tie to be a json, it can be html, xml etc...

  =>Stateless, every request that we pass to the server has to provide all the necessary information to understand the request. SO the server cannot keep state between requests. 
  The server dosnt need to store or keep information to know what the user wants with the next request
  So its the client who needs to send all the information to make the server process the request (url, pagination, ...)


  =>Uniform UI: all of our url has to be the same structure, and do the same thing (/pokemon/pickachu === /pokemon/charmander)


  => Separation of concepts: The components of the client and dthe server are separated. Allow the client and the server to grow independently
*/