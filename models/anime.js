const { Schema, model } = require("mongoose");

const IMG = {
  image_url: String,
  small_img_url: String,
  large_img_url: String
}

const AnimeSchema = Schema({
  title: String,
  genres: [],
  synopsis: String,
  year: Number,
  images: {
    jpg: IMG,
    webp: IMG
  }
})

module.exports = model("Anime", AnimeSchema);