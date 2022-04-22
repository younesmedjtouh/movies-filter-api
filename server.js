const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const helper = require("./helper/helper");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("public"));
app.use("/images", express.static("images"));

let movies = [
  {
    id: "1",
    title: "Oceans 8",
    category: "Comedy",
    thumbnail: "1.jpg",
    likes: 4,
    dislikes: 1,
    likeActive: false,
    dislikeActive: false,
  },
  {
    id: "2",
    title: "Midnight Sun",
    category: "Comedy",
    thumbnail: "2.jpg",
    likes: 2,
    dislikes: 0,
    likeActive: false,
    dislikeActive: false,
  },
  {
    id: "3",
    title: "Les indestructibles 2",
    category: "Animation",
    thumbnail: "3.jpg",
    likes: 3,
    dislikes: 1,
    likeActive: false,
    dislikeActive: false,
  },
  {
    id: "4",
    title: "Sans un bruit",
    category: "Thriller",
    thumbnail: "4.jpg",
    likes: 6,
    dislikes: 6,
    likeActive: false,
    dislikeActive: false,
  },
  {
    id: "5",
    title: "Creed II",
    category: "Drame",
    thumbnail: "5.jpg",
    likes: 16,
    dislikes: 2,
    likeActive: false,
    dislikeActive: false,
  },
  {
    id: "6",
    title: "Gone Girl",
    category: "Thriller",
    thumbnail: "6.jpg",
    likes: 22,
    dislikes: 12,
    likeActive: false,
    dislikeActive: false,
  },
  {
    id: "7",
    title: "Pulp Fiction",
    category: "Thriller",
    thumbnail: "7.jpg",
    likes: 1233,
    dislikes: 32,
    likeActive: false,
    dislikeActive: false,
  },
  {
    id: "8",
    title: "Seven",
    category: "Thriller",
    thumbnail: "8.jpg",
    likes: 2,
    dislikes: 1,
    likeActive: false,
    dislikeActive: false,
  },
  {
    id: "9",
    title: "Inception",
    category: "Thriller",
    thumbnail: "9.jpg",
    likes: 2,
    dislikes: 1,
    likeActive: false,
    dislikeActive: false,
  },
];

app.get("/api/categories", async (req, res, next) => {
  var categories = [];
  movies.forEach((movie) => categories.push(movie.category));
  return res.status(200).json(helper.getUniqueCategories(categories));
});

app.get("/api/movies", async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  let searchterm = req.query.searchTerm;
  let categories = req.query.categories;
  let result = movies;
  if (searchterm != null) {
    result = result.filter((item) =>
      item.title.toLowerCase().includes(searchterm.toLowerCase())
    );
  }
  if (categories != null) {
    var type = typeof categories;
    if (type == "string") {
      result = result.filter((item) => item.category.includes(categories));
    } else {
      result = result.filter((el) => {
        return categories.some((f) => {
          return f === el.category;
        });
      });
    }
  }
  return helper.pagination(res, result, page);
});

app.delete("/api/movies/:id", async (req, res, next) => {
  try {
    movies = movies.filter((c) => c.id !== req.params.id);
    res.status(200).json({ message: "deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.put("/api/movies/:id", async (req, res, next) => {
  try {
    movies = movies.map((p) =>
      p.id === req.params.id
        ? {
            ...p,
            dislikeActive: req.body.movie.dislikeActive,
            likeActive: req.body.movie.likeActive,
            likes: req.body.movie.likes,
            dislikes: req.body.movie.dislikes,
          }
        : p
    );

    return res.status(200).json({ message: "modified successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// start server
const port = 4000;
app.listen(port, () => console.log("Server listening on port " + port));
