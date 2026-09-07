const elementNames = ['header', 'nav', 'footer'];

function replacePlaceholder(otherDoc, name) {
  const template = otherDoc.getElementById(`${name}-template`);
  const placeholder = document.getElementById(`${name}-placeholder`);

  const imported = document.importNode(template, true);
  placeholder.appendChild(imported.content);
}

function runWithDoc(path, onGet) {
  fetch(path)
    .then(response => {
      if (!response.ok)
        throw new Error(`Response status: ${response.status}`);
      return response.text()
    })
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      onGet(doc);
    });
}

for (const id in elementNames) {
  const name = elementNames[id];
  runWithDoc(`/templates/${name}.html`, otherDoc => {
    replacePlaceholder(otherDoc, name);
  });
}
