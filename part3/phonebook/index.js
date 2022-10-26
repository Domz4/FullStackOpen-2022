const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());

morgan.token("data", (req, res) =>
  req.method === "POST" ? JSON.stringify(req.body) : ""
);
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
const generateId = () => {
  const maxId =
    phonebook.length > 0 ? Math.max(...phonebook.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});
app.post("/api/phonebook", (req, res) => {
  const body = req.body;
  const persons = phonebook.find(
    (e) => e.name === body.name || e.number === body.number
  );
  if (!body) {
    return res.status(400).json({ error: "content missing" });
  }
  if (!!persons) {
    return res.status(406).json({
      error: `User ${persons.name} or number ${persons.number} already exists`,
    });
  }
  if (body.name === "" || body.number === "") {
    return res.json({ error: "You must enter name and number" });
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number,
  };
  phonebook = phonebook.concat(person);
  res.json(person);
});

app.get("/api/phonebook", (req, res) => {
  res.json(phonebook);
});

app.delete("/api/phonebook/:id", (req, res) => {
  const id = Number(req.params.id);
  phonebook = phonebook.filter((e) => e.id !== id);

  res.status(204).end();
});

app.get("/api/phonebook/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = phonebook.find((e) => e.id === id);

  if (person) res.json(person);
  else {
    res.send("<h1> Not found 404 </h1>");
    2;
    res.status(404).end();
  }
});

app.get("/info", (req, res) => {
  res.send(
    `<h1>Phonebook has info for ${
      phonebook.length
    } people</h1> <p>${new Date()}</p>`
  );
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`server running on port${PORT}`);
});
