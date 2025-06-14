document.addEventListener("DOMContentLoaded", function() {
  // Modal variables
  var modal = document.getElementById("create-twit-modal");
  var modalBackdrop = document.getElementById("modal-backdrop");

  // Display the modal by removing "hidden" and adding "unhidden" classes.
  function displayNewTwitModal() {
    modal.classList.remove("hidden");
    modalBackdrop.classList.remove("hidden");
    // (Only add "unhidden" once, as adding it twice is redundant.)
    modal.classList.add("unhidden");
  }

  // Attach event listener to the create-twit button.
  var createTwitButton = document.getElementById("create-twit-button");
  createTwitButton.addEventListener("click", displayNewTwitModal);

  // Close the modal by reverting the classes.
  function closeNewTwitModal() {
    modal.classList.remove("unhidden");
    modalBackdrop.classList.remove("unhidden");
    modal.classList.add("hidden");
    modalBackdrop.classList.add("hidden");
  }

  // Attach event listeners to modal close and cancel buttons.
  var closeButton = document.getElementsByClassName("modal-close-button")[0];
  closeButton.addEventListener("click", closeNewTwitModal);
  var cancelButton = document.getElementsByClassName("modal-cancel-button")[0];
  cancelButton.addEventListener("click", closeNewTwitModal);

  // Create a new twit post
  function createTwit() {
    // NOTE: Adjusted the element IDs to match your HTML.
    var twitText = document.getElementById("twit-text").value;
    var author = document.getElementById("twit-author").value;

    if (twitText === "" || author === "") {
      alert("Please enter something into the 'twit text' or 'author' box");
      return;
    }

    // Get the container for tweets
    var accessDOM = document.getElementsByClassName("twit-container")[0];

    // Create the article element with appropriate classes.
    var twitArticle = document.createElement("article");
    twitArticle.classList.add("twit");

    // Create and append the twit icon div.
    var twitIconDiv = document.createElement("div");
    twitIconDiv.classList.add("twit-icon");
    twitArticle.appendChild(twitIconDiv);
    var bullhornIcon = document.createElement("i");
    bullhornIcon.classList.add("fas", "fa-bullhorn");
    twitIconDiv.appendChild(bullhornIcon);

    // Create and append the content div.
    var twitContentDiv = document.createElement("div");
    twitContentDiv.classList.add("twit-content");
    twitArticle.appendChild(twitContentDiv);

    // Create and set the text paragraph.
    var twitTextPar = document.createElement("p");
    twitTextPar.classList.add("twit-text");
    twitTextPar.textContent = twitText;
    twitContentDiv.appendChild(twitTextPar);

    // Create and set the author paragraph.
    var twitAuthorPar = document.createElement("p");
    twitAuthorPar.classList.add("twit-author");
    twitContentDiv.appendChild(twitAuthorPar);
    var authorHyperlink = document.createElement("a");
    authorHyperlink.href = "#";
    authorHyperlink.textContent = author;
    twitAuthorPar.appendChild(authorHyperlink);

    // Append the new twit element to the DOM
    accessDOM.appendChild(twitArticle);

    closeNewTwitModal();
  }
  
  // Attach event listener to the modal accept button.
  var acceptButton = document.getElementsByClassName("modal-accept-button")[0];
  acceptButton.addEventListener("click", createTwit);

  // Search function to filter twits.
  function search() {
    var allTwits = document.getElementsByClassName("twit");
    console.log("Num of twits", allTwits.length);
    var userInput = document.getElementById("navbar-search-input").value.toLowerCase();
    
    // Loop in reverse order to safely remove non-matching nodes.
    for (var i = allTwits.length - 1; i >= 0; i--) {
      var currTwit = allTwits[i].textContent.toLowerCase();
      if (!currTwit.includes(userInput)) {
        allTwits[i].remove();
      }
    }
  }

  // Attach event listeners to the navbar search elements.
  var searchButton = document.getElementById("navbar-search-button");
  searchButton.addEventListener("click", search);
  var instaSearch = document.getElementById("navbar-search-input");
  instaSearch.addEventListener("keyup", search);
});
