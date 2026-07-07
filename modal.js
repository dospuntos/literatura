const modalOverlay = document.getElementById("modal-overlay");
const modalContent = document.getElementById("modal-content");
const modalClose = document.getElementById("modal-close");

let dialogOpen = false; // now a true global, shared with index.js

const helpOverlay = document.getElementById("help-overlay");
let helpOpen = false;

function toggleHelp() {
  if (dialogOpen && !helpOpen) return; // don't open help over an active interaction dialog
  helpOpen = !helpOpen;
  dialogOpen = helpOpen; // reuses your existing movement-freeze logic
  helpOverlay.classList.toggle("hidden", !helpOpen);
}

function openModal(point) {
  dialogOpen = true;

  const titleHtml = point.title
    ? `<div id="modal-title">${point.title}</div>`
    : "";

  const sourceHtml = point.source
    ? `<div id="modal-source">— ${point.source}</div>`
    : "";

  if (point.type === "iframe") {
    modalContent.innerHTML = `
      ${titleHtml}
      <iframe src="${point.url}" allowfullscreen></iframe>
      ${sourceHtml}
    `;
  } else {
    modalContent.innerHTML = `
      ${titleHtml}
      <p id="modal-message">${point.message}</p>
      ${sourceHtml}
    `;
  }

  modalOverlay.classList.remove("hidden");
}

function closeModal() {
  dialogOpen = false;
  modalOverlay.classList.add("hidden");
  modalContent.innerHTML = "";
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && dialogOpen && !gameEnded) {
    closeModal();
  }
});

modalOverlay.addEventListener("click", (event) => {
  if (event.target === modalOverlay && !gameEnded) {
    closeModal();
  }
});

modalClose.addEventListener("click", closeModal);
