//const PATH = "";//"https://austinkr.github.io/koernercoder.dev";

async function loadFile(path) {
  const response = await fetch(path);
  if (!response.ok)
    throw new Error(`Response status: ${response.status}`);

  return response;
}

function updatePostCard(child, info) {
  // Update info
  child.children[1].children[0].textContent = info.date;
  child.children[1].children[1].textContent = info.title;
  child.children[1].children[2].textContent = info.description;

  // Create anchors from info
  const root = child.children[1].children[3]
  const firstLi = root.children[0];
  for (let i = 0; i < info.anchors.length; i++){
    let currentLi = firstLi;
    if (i > 0)
      currentLi = firstLi.cloneNode(true);

    // Update current anchor
    const anchorInfo = info.anchors[i];
    currentLi.children[0].href = anchorInfo.link;
    currentLi.children[0].textContent = anchorInfo.alias;

    if (i > 0)
      root.appendChild(currentLi);
  }
 // child.children[1].children[1].textContent = info.iconName;
}

const postsGrid = document.querySelector('.posts-grid');

function loadPosts(json) {
  loadFile(`${PATH}/templates/post.html`)
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
        updatePostCard(child, info);
      }
    })
}

if (postsGrid !== null)
  loadFile(`${PATH}/rsc/projects.json`)
    .then(response => response.json())
    .then(json => loadPosts(json));
