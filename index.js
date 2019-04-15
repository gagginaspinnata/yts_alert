const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://yts.am";

async function getSource() {
  const response = await axios.get(url);
  return response;
}

async function main() {
  // getting the source code from the homepage
  sources = await getSource(url);
  source = sources["data"];

  //   loading the cheerio object
  $ = cheerio.load(source);

  //   selecting the popular download
  let data = $("#popular-downloads")
    .find(".row")
    .find(".browse-movie-wrap");
  let result = [];

  // iterating through the popular downlaod
  data.each(function(i, el) {
    let movie = [];

    movie["title"] = $(this)
      .find(".browse-movie-title")
      .text();

    movie["year"] = $(this)
      .find(".browse-movie-year")
      .text();

    movie["rating"] = $(el)
      .find(".rating")
      .text()
      .split("/")[0]
      .trim();

    movie["link"] = $(el)
      .find(".browse-movie-title")
      .attr("href");

    movie["image"] = $(el)
      .find(".img-responsive")
      .attr("src");

    movie["image"] = url + movie["image"];

    console.log(movie);
  });
}

main();
