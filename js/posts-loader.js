async function loadFile(path) {
  const response = await fetch(path);
  if (!response.ok)
    throw new Error(`Response status: ${response.status}`);

  return response;
}

const postsGrid = document.querySelector('.posts-grid');

function loadPosts(json) {
  loadFile('https://austinkr.github.io/koernercoder.dev/templates/post.html')
    .then(response => response.text())
    .then(html => {
      // Load templates
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const template = doc.getElementById('post-template');
      for (let i = 0; i < json.length; i++) {
        const imported = document.importNode(template, true);
        postsGrid.appendChild(imported.content);
      }
    })
    .then(() => {
      for (let i = 0; i < postsGrid.children.length; i++) {
        const child = postsGrid.children[i];
        const info = json[i];
        child.children[1].children[1].textContent = info.title;
        child.children[1].children[0].textContent = info.date;
        child.children[1].children[2].textContent = info.description;
       // child.children[1].children[1].textContent = info.iconName;
      }
    })
}

if (postsGrid !== null)
  loadFile(`/rsc/projects.json`)
    .then(response => response.json())
    .then(json => loadPosts(json));
