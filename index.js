const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors')

//middlewares
app.use(express.json());  

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

  app.use(cors())
  app.use(requestLogger)


  //our mock data

let persons = [
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Faris",
    number: "321312312321",
    id: 6,
  },
  {
    name: "Bilal Ahmed",
    number: "20312312312",
    id: 7,
  },
];

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

const generateRandomId = () => {
     return Math.ceil(Math.random() * (1000 - 100) + 100)
}

//Morgan middleware
morgan.token("data", (req, res) => {
    const { body } = req;
  
    return JSON.stringify(body);
  });
  
  app.use(
    morgan(":method :url :status :res[content-length] - :response-time ms :data"),
  ); 


app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  if(!body.number){
      return response.status(400).json({
          error : "Number missing"
      })
  }

  const note = {
    content: body.content,
    number: body.number,
    id: generateRandomId(),
  };

  persons = persons.concat(note);

  response.json(note);
});

app.get("/info", (request, response) => {
    
 let info = `There are  ${persons.length} numbers` + '<Br/>' + new Date()
        
  response.send(info);
}); 

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  const note = persons.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
      response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  persons = persons.filter((note) => note.id !== id);

  response.status(204).end();
});

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)


const PORT = process.env.PORT || 3020
app.listen(PORT, () => {
  console.log(`Server running on port -> ${PORT}`);
});
