require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Phone = require("./models/phone");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));





const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);


//incremental id
const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};

const generateRandomId = () => {
  return Math.ceil(Math.random() * (1000 - 100) + 100);
};

//Morgan middleware
morgan.token("data", (req, res) => {
  const { body } = req;

  return JSON.stringify(body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

//middlewares

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  if (!body.number) {
    return response.status(400).json({
      error: "Number missing",
    });
  }

  const phone = new Phone({
    name: body.name,
    number: body.number,
  });

  phone.save().then((savedNbr) => {
    response.json(savedNbr);
  });
});




app.get("/info", (request, response) => {
  Phone.count({}, (err, count)=>{
    response.json(`there are ${count} phone numbers stores ${new Date()}`)
});
});

app.get("/api/persons", (request, response) => {
  Phone.find({}).then((phones) => {
    response.json(phones);
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Phone.findById(request.params.id)
    .then((phone) => {
      if (phone) {
        response.json(phone);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
  Phone.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const phone = {
    name: body.name,
    number: body.number,
  }

  Phone.findByIdAndUpdate(request.params.id, phone, { new: true })
    .then(updatedPhone => {
      response.json(updatedPhone)
    })
    .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)


//error handling middlare
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

app.use(errorHandler);



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port -> ${PORT}`);
});
