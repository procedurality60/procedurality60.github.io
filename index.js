document.addEventListener("DOMContentLoaded", function() {
  // Modal variables
  var modal = document.getElementById("create-twit-modal");
  var modalBackdrop = document.getElementById("modal-backdrop");

  // Display the modal
  function displayNewTwitModal() {
    modal.classList.remove("hidden");
    modalBackdrop.classList.remove("hidden");
    // Only add "unhidden" once to avoid duplication.
    modal.classList.add("unhidden");
  }

  var createTwitButton = document.getElementById("create-twit-button");
  createTwitButton.addEventListener("click", displayNewTwitModal);

  // Close modal
  function closeNewTwitModal() {
    modal.classList.remove("unhidden");
    modalBackdrop.classList.remove("unhidden");
    modal.classList.add("hidden");
    modalBackdrop.classList.add("hidden");
  }

  var closeButton = document.getElementsByClassName("modal-close-button")[0];
  closeButton.addEventListener("click", closeNewTwitModal);
  var cancelButton = document.getElementsByClassName("modal-cancel-button")[0];
  cancelButton.addEventListener("click", closeNewTwitModal);

  // Create a new twit post
  function createTwit() {
    // Use the IDs from your modal input fields;
    // Note: Ensure your modal has inputs with these IDs ("twit-text" & "twit-author")
    var twitText = document.getElementById("twit-text").value;
    var author = document.getElementById("twit-author").value;

    if (twitText === "" || author === "") {
      alert("Please enter something into the 'twit text' or 'author' box");
      return;
    }

    // Get the tweets container
    var accessDOM = document.getElementsByClassName("twit-container")[0];

    // Create the tweet article.
    var twitArticle = document.createElement("article");
    twitArticle.classList.add("twit");

    // Create the icon div; instead of the bullhorn, we now create an SVG profile picture.
    var twitIconDiv = document.createElement("div");
    twitIconDiv.classList.add("twit-icon");

    var svgns = "http://www.w3.org/2000/svg";
    var profileSvg = document.createElementNS(svgns, "svg");
    profileSvg.setAttribute("class", "profile-icon");
    profileSvg.setAttribute("width", "32");
    profileSvg.setAttribute("height", "32");
    profileSvg.setAttribute("viewBox", "0 0 24 24");
    profileSvg.setAttribute("fill", "none");
    profileSvg.setAttribute("stroke", "currentColor");
    profileSvg.setAttribute("stroke-width", "2");
    profileSvg.setAttribute("stroke-linecap", "round");
    profileSvg.setAttribute("stroke-linejoin", "round");

    var path1 = document.createElementNS(svgns, "path");
    path1.setAttribute("d", "M20 21v-2a4 4 0 0 0-3-3.87");
    profileSvg.appendChild(path1);

    var path2 = document.createElementNS(svgns, "path");
    path2.setAttribute("d", "M4 21v-2a4 4 0 0 1 3-3.87");
    profileSvg.appendChild(path2);

    var circle = document.createElementNS(svgns, "circle");
    circle.setAttribute("cx", "12");
    circle.setAttribute("cy", "7");
    circle.setAttribute("r", "4");
    profileSvg.appendChild(circle);

    // Append the profile SVG to the icon container.
    twitIconDiv.appendChild(profileSvg);
    twitArticle.appendChild(twitIconDiv);

    // Create the content div.
    var twitContentDiv = document.createElement("div");
    twitContentDiv.classList.add("twit-content");
    twitArticle.appendChild(twitContentDiv);

    // Create and append the text paragraph.
    var twitTextPar = document.createElement("p");
    twitTextPar.classList.add("twit-text");
    twitTextPar.textContent = twitText;
    twitContentDiv.appendChild(twitTextPar);

    // Create and append the author paragraph.
    var twitAuthorPar = document.createElement("p");
    twitAuthorPar.classList.add("twit-author");
    twitContentDiv.appendChild(twitAuthorPar);

    var authorHyperlink = document.createElement("a");
    authorHyperlink.href = "#";
    authorHyperlink.textContent = author;
    // Set the username text color to orange when posted.
    authorHyperlink.style.color = "orange";
    twitAuthorPar.appendChild(authorHyperlink);

    // Append the new tweet to the tweet container.
    accessDOM.appendChild(twitArticle);

    closeNewTwitModal();
  }

  var acceptButton = document.getElementsByClassName("modal-accept-button")[0];
  acceptButton.addEventListener("click", createTwit);

  // Search functionality.
  function search() {
    var allTwits = document.getElementsByClassName("twit");
    console.log("Num of twits", allTwits.length);
    var userInput = document.getElementById("navbar-search-input").value.toLowerCase();

    // Loop backward for safe removal.
    for (var i = allTwits.length - 1; i >= 0; i--) {
      var currTwit = allTwits[i].textContent.toLowerCase();
      if (!currTwit.includes(userInput)) {
        allTwits[i].remove();
      }
    }
  }

  var searchButton = document.getElementById("navbar-search-button");
  searchButton.addEventListener("click", search);
  var instaSearch = document.getElementById("navbar-search-input");
  instaSearch.addEventListener("keyup", search);
});
