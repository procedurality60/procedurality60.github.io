document.addEventListener("DOMContentLoaded", function () {
  // Modal variables
  var modal = document.getElementById("create-twit-modal");
  var modalBackdrop = document.getElementById("modal-backdrop");

  // Functions to show and hide the modal
  function displayNewTwitModal() {
    modal.classList.remove("hidden");
    modalBackdrop.classList.remove("hidden");
    modal.classList.add("unhidden");
  }

  function closeNewTwitModal() {
    modal.classList.remove("unhidden");
    modalBackdrop.classList.remove("unhidden");
    modal.classList.add("hidden");
    modalBackdrop.classList.add("hidden");
  }

  // Event listeners for modal buttons
  var createTwitButton = document.getElementById("create-twit-button");
  createTwitButton.addEventListener("click", displayNewTwitModal);

  var closeButton = document.getElementsByClassName("modal-close-button")[0];
  closeButton.addEventListener("click", closeNewTwitModal);
  var cancelButton = document.getElementsByClassName("modal-cancel-button")[0];
  cancelButton.addEventListener("click", closeNewTwitModal);

  // Function to create a new twit post in the DOM.
  function createTwitElement(twitText, author) {
    var accessDOM = document.getElementsByClassName("twit-container")[0];

    var twitArticle = document.createElement("article");
    twitArticle.classList.add("twit");

    // Create an icon div with an SVG profile picture.
    var twitIconDiv = document.createElement("div");
    twitIconDiv.classList.add("twit-icon");

    // Create the SVG element using the SVG namespace.
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

    twitIconDiv.appendChild(profileSvg);
    twitArticle.appendChild(twitIconDiv);

    // Create content div
    var twitContentDiv = document.createElement("div");
    twitContentDiv.classList.add("twit-content");
    twitArticle.appendChild(twitContentDiv);

    // Create and append the twit text paragraph.
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
    // Make posted username orange:
    authorHyperlink.style.color = "orange";
    twitAuthorPar.appendChild(authorHyperlink);

    // Append the constructed twit element to the DOM.
    accessDOM.appendChild(twitArticle);
  }

  // AJAX function using Fetch API to POST form data without page reload or redirect.
  var form = document.getElementById("twitForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form's default submission behavior

    var formData = new FormData(form);
    var twitText = formData.get("twitText");
    var author = formData.get("name");

    // Check if required fields are not empty.
    if (twitText === "" || author === "") {
      alert("Please enter something into the 'twit text' or 'author' box");
      return;
    }

    // AJAX request with fetch (adjust the endpoint as needed)
    fetch("https://formsubmit.co/proceduralitytutorials@gmail.com", {
      method: "POST",
      body: formData,
    })
      .then(function (response) {
        // Here, we assume a successful response means status 200.
        if (response.ok) {
          // Optionally, you can alert success or simply update the DOM.
          alert("Twit posted successfully!");
          // Create a new twit element in the DOM (which includes our SVG profile icon)
          createTwitElement(twitText, author);
          form.reset();
          closeNewTwitModal();
        } else {
          alert("Error posting twit.");
        }
      })
      .catch(function (error) {
        console.error("AJAX error:", error);
        alert("Error posting twit.");
      });
  });

  // Search function to filter displayed twits.
  function search() {
    var allTwits = document.getElementsByClassName("twit");
    var userInput = document.getElementById("navbar-search-input").value.toLowerCase();

    // Loop backward to safely remove unmatched elements.
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
