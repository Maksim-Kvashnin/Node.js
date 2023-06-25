const express = require("express");
const { v4: uuid } = require("uuid");

class Book {
  constructor(body) {
    this.id = uuid();
    this.title = body.title || "";
    this.description = body.description || "";
    this.authors = body.authors || "";
    this.favorite = body.favorite || "";
    this.fileCover = body.fileCover || "";
    this.fileName = body.fileName || "";
  }
}

const store = {
  books: [
       new Book({}),
       new Book({})
  ],
};

const app = express();
app.use(express.json());

app.post("/api/user/login", (req, res) => {
  const user = { id: 1, mail: "test@mail.ru" };
  res.status(201);
  res.json(user);
});

app.get("/api/books", (req, res) => {
  const { books } = store;
  res.json(books);
});

app.get("/api/books/:id", (req, res) => {
  const { books } = store;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json("404 | страница не найдена");
  }
});

app.post("/api/books", (req, res) => {
  console.log(req.body);
  const book = new Book(req.body);

  store.books.push(book);

  res.status(201);
  res.json(book);
});

app.put("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const idx = store.books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    store.books[idx] = {
      ...store.books[idx],
      ...req.body,
    };

    res.json(store.books[idx]);
  } else {
    res.status(404);
    res.json("404 | страница не найдена");
  }
});

app.delete("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const idx = store.books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    store.books.splice(idx, 1);
    res.json("ok");
  } else {
    res.status(404);
    res.json("404 | страница не найдена");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
