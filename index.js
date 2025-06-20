document.addEventListener("DOMContentLoaded", () => {
  // Modal & form elements
  const modal          = document.getElementById("create-twit-modal");
  const modalBackdrop  = document.getElementById("modal-backdrop");
  const form           = document.getElementById("twitForm");
  const urlInput       = document.getElementById("twit-url");
  const faviconPreview = document.getElementById("favicon-preview");
  const titleInput     = document.getElementById("twit-text");
  let   fetchedMetaDesc= "";

  // Show / hide modal
  function showModal() {
    modalBackdrop.classList.remove("hidden");
    modal.classList.remove("hidden");
    modal.classList.add("unhidden");
  }
  function hideModal() {
    modal.classList.remove("unhidden");
    modalBackdrop.classList.remove("unhidden");
    modal.classList.add("hidden");
    modalBackdrop.classList.add("hidden");
  }

  // Wire modal buttons
  document.getElementById("create-twit-button")
          .addEventListener("click", showModal);
  document.querySelector(".modal-close-button")
          .addEventListener("click", hideModal);
  document.querySelector(".modal-cancel-button")
          .addEventListener("click", hideModal);

  // On URL change: preview favicon, default title, fetch meta description
  urlInput.addEventListener("change", () => {
    const val = urlInput.value.trim();
    if (!val) {
      faviconPreview.src    = "";
      titleInput.value      = "";
      fetchedMetaDesc       = "";
      return;
    }

    try {
      const urlObj = new URL(val);
      // 1) Favicon
      faviconPreview.src = 
        "https://www.google.com/s2/favicons?sz=64&domain_url=" 
        + encodeURIComponent(val);

      // 2) Default title = second-level domain
      const parts = urlObj.hostname.split(".");
      titleInput.value = parts.length >= 2
        ? parts[parts.length - 2]
        : urlObj.hostname;

      // 3) Fetch remote meta description via CORS proxy
      fetchedMetaDesc = "";
      fetch("https://cors-anywhere.herokuapp.com/" + val)
        .then(r => r.text())
        .then(html => {
          const m = html.match(
            /<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i
          );
          fetchedMetaDesc = m ? m[1] : "";
        })
        .catch(() => {
          fetchedMetaDesc = "";
        });

    } catch (err) {
      console.error("Invalid URL", err);
    }
  });

  // AJAX form submit + render tweet
  form.addEventListener("submit", e => {
    e.preventDefault();
    const data     = new FormData(form);
    const twitText = data.get("twitText").trim();
    const author   = data.get("name").trim();
    if (!twitText || !author) {
      return alert("Please fill in both URL/title and username.");
    }

    // Capture current favicon preview
    const faviconUrl = faviconPreview.src || "";

    fetch("https://formsubmit.co/proceduralitytutorials@gmail.com", {
      method: "POST",
      body: data
    })
    .then(res => {
      if (!res.ok) throw new Error("Network response not OK");
      // On success: append tweet, reset form, hide modal
      appendTweet(twitText, author, fetchedMetaDesc, faviconUrl);
      form.reset();
      hideModal();
      // Reset preview inputs
      faviconPreview.src = "";
      titleInput.value   = "";
      fetchedMetaDesc    = "";
    })
    .catch(err => {
      console.error("Error posting twit:", err);
      alert("Error posting twit.");
    });
  });

  // Build and append a tweet element
  function appendTweet(text, user, description, faviconUrl) {
    const container = document.querySelector(".twit-container");
    const article   = document.createElement("article");
    article.classList.add("twit");

    // Icon container
    const iconDiv = document.createElement("div");
    iconDiv.classList.add("twit-icon");

    if (faviconUrl) {
      const img = document.createElement("img");
      img.src   = faviconUrl;
      img.alt   = "";
      img.classList.add("twit-favicon");
      iconDiv.appendChild(img);
    } else {
      iconDiv.innerHTML = `
        <svg class="profile-icon" width="32" height="32"
             viewBox="0 0 24 24" fill="none" stroke="orange"
             stroke-width="2" stroke-linecap="round"
             stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M4 21v-2a4 4 0 0 1 3-3.87"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>`;
    }
    article.appendChild(iconDiv);

    // Content
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("twit-content");
    contentDiv.innerHTML = `
      <p class="twit-text">${text}</p>
      <p class="twit-author">
        <a href="#" style="color:orange">${user}</a>
      </p>
      <p class="twit-description">${description}</p>`;
    article.appendChild(contentDiv);

    container.appendChild(article);
  }

  // Search/filter tweets
  function search() {
    const all = document.getElementsByClassName("twit");
    const q   = document.getElementById("navbar-search-input")
                          .value.toLowerCase();
    for (let i = all.length - 1; i >= 0; i--) {
      if (!all[i].textContent.toLowerCase().includes(q)) {
        all[i].remove();
      }
    }
  }
  document.getElementById("navbar-search-button")
          .addEventListener("click", search);
  document.getElementById("navbar-search-input")
          .addEventListener("keyup", search);
});
