function replacePlaceholderFrom(otherDoc, name, placeholder) {
  const template = otherDoc.getElementById(`${name}-template`);
  const imported = document.importNode(template, true);
  placeholder.appendChild(imported.content);
}

function replacePlaceholder(name, placeholder) {
  fetch(`/templates/${name}.html`)
    .then((response) => {
      if (!response.ok)
        throw new Error(`Response status: ${response.status}`);
      return response.text();
    })
    .then((html) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      replacePlaceholderFrom(doc, name, placeholder);
    });
}

// Load elements that are shown on every page
const staticElementNames = ['header', 'nav', 'footer'];
for (const name of staticElementNames) {
  const placeholder = document.getElementById(`${name}-placeholder`);
  replacePlaceholder(name, placeholder);
}

// // Load posts
// const postsGrid = document.querySelector('.posts-grid');
// if (postsGrid !== null)
//   for (const placeholder of postsGrid.children) {
//     replacePlaceholder('post', placeholder)
//   }
