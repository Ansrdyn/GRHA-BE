require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const axios = require("axios");
const baseUrl =
  "https://api.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1";

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const url = baseUrl;
  let { page } = req.query;
  const perPage = 10;
  axios
    .get(url)
    .then((response) => {
      const data = response.data;
      const totalPages = Math.ceil(data.items.length / perPage);
      if (page === undefined) {
        page = 1;
      } else if (isNaN(page) || page < 1 || page > totalPages) {
        res.status(404).send("Page not found");
      }
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const items = data.items.slice(start, end);
      res.render("image", { items, page, totalPages });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Error load photos");
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// module.exports = app;
