const imgContainer = document.querySelector(".img-container");
const loader = document.querySelector(".loader");

let pics = [];
const apiKey = "AZTsWGjRgx5hrL9Uy4cmbbKNX9pXhmw9Hs6soU3x9lc";
const count = 30;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=wild-animals`;
let ready = false;
let imagesLoadedCount = 0;
function imageLoaded() {
  imagesLoadedCount++;
  if (imagesLoadedCount == count) {
    ready = true;
    loader.hidden = true;
  }
}
async function getPics() {
  try {
    const res = await fetch(apiUrl);
    pics = await res.json();
    displayPics();
  } catch (e) {
    console.log("ERROR!", e);
  }
}
function displayPics() {
  imagesLoadedCount = 0;
  for (let pic of pics) {
    // <a>
    const item = document.createElement("a");
    item.setAttribute("target", "_blank");
    item.setAttribute("href", pic.links.html);

    // <img>
    const image = document.createElement("img");
    image.setAttribute("src", pic.urls.regular);
    image.setAttribute("alt", pic.alt_description);
    image.setAttribute("title", pic.alt_description);

    // Check if we have finished loading
    image.addEventListener("load", imageLoaded);

    // Append
    item.append(image);
    imgContainer.append(item);
  }
}
// On Load
getPics();
window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >= document.body.scrollHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPics();
  }
});
