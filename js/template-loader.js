const elementNames = ['header', 'nav', 'footer'];

function replacePlaceholder(otherDoc, name) {
  const template = otherDoc.getElementById(`#${name}-template`);
  const placeholder = document.getElementById(`#${name}-placeholder`);

  const imported = document.importNode(template.content, true);
  placeholder.appendChild(imported);
}

for (const id in elementNames) {
  const name = elementNames[id];

  fetch(`../templates/${name}.html`)
    .then(response => {
      if (!response.ok)
        throw new Error(`Response status: ${response.status}`);
    })
    .then(response => response.text())
    .then(html => {
      const parser = new DOMParser();
      const otherDoc = parser.parseFromString(html, 'text/html');
      replacePlaceholder(otherDoc, name);
    })
}
