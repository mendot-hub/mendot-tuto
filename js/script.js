document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector("form[role='search'] input[type='search']");
  const container = document.getElementById("content");

  function removeHighlights() {
    container.querySelectorAll(".highlight").forEach(el => {
      el.replaceWith(document.createTextNode(el.textContent));
    });
  }

  function highlightText(keyword) {
    if (!keyword) {
      removeHighlights();
      return;
    }

    const regex = new RegExp(`(${keyword})`, "gi");

    container.querySelectorAll("*:not(script):not(style)").forEach(node => {
      node.childNodes.forEach(child => {
        if (child.nodeType === 3 && regex.test(child.nodeValue)) {
          const span = document.createElement("span");
          span.innerHTML = child.nodeValue.replace(regex, `<span class="highlight">$1</span>`);
          child.replaceWith(...span.childNodes);
        }
      });
    });

    // scroll ke highlight pertama
    let first = container.querySelector(".highlight");
    if (first) {
      first.scrollIntoView({behavior: "smooth", block: "center"});
    }
  }

  // jalan saat mengetik
  searchInput.addEventListener("input", () => {
    removeHighlights();
    let keyword = searchInput.value.trim();
    if (keyword) {
      highlightText(keyword);
    }
  });

  // cegah reload saat submit
  document.querySelector("form[role='search']").addEventListener("submit", e => {
    e.preventDefault();
  });
});