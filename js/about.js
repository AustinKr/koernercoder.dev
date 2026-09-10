const contactButton = document.getElementById("contact-button");
contactButton.addEventListener("click", () => {
  const container = document.getElementById("contact-container");
  container.classList.toggle('hidden');
});

const EMAIL_PRETEXT = 'mailto:austin_koerner@outlook.com?subject=Client - Portfolio Site';
let emailFrom = '';
let emailBody = '';
const send = document.getElementById("contact-send");

function updateSend() {
  console.log(`update from ${emailFrom} body ${emailBody}`);
  send.href = `${EMAIL_PRETEXT}?from=${emailFrom}}?body=${emailBody}`;
}

document.getElementById("contact-email").addEventListener("input", event => {
  emailFrom = event.target.value;
  updateSend();
});
document.getElementById("contact-message").addEventListener("input", event => {
  emailBody = event.target.value;
  updateSend();
});
