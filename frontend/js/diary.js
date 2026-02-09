const diaryList = document.getElementById("diaryList");
const modal = document.getElementById("modal");
const entryText = document.getElementById("entryText");
const modalTitle = document.getElementById("modalTitle");
const emptyState = document.getElementById("emptyState");

// ================= LOAD =================
fetchEntries();

async function fetchEntries() {
  const res = await fetch("http://localhost:5000/api/diary");
  const data = await res.json();

  diaryList.innerHTML = "";

  if (data.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  data.forEach(entry => {
    const card = document.createElement("div");
    card.className = "card diary-card";

    const date = new Date(entry.createdAt).toDateString();
    const preview =
      entry.content.length > 130
        ? entry.content.slice(0, 130) + "..."
        : entry.content;

    card.innerHTML = `
      <small>${date}</small>
      <p>${preview}</p>

      <div class="diary-actions">
        <button class="read-btn">Read more</button>
        <button class="delete-btn" title="Delete">🗑</button>
      </div>
    `;

    card.querySelector(".read-btn").addEventListener("click", () => {
      openEntry(entry);
    });

    card.querySelector(".delete-btn").addEventListener("click", e => {
      e.stopPropagation();
      deleteEntry(entry._id);
    });

    diaryList.appendChild(card);
  });
}

// ================= MODAL =================
function openNewEntry() {
  modalTitle.innerText = "New Entry";
  entryText.value = "";
  modal.style.display = "flex";
}

function openEntry(entry) {
  modalTitle.innerText = new Date(entry.createdAt).toDateString();
  entryText.value = entry.content;
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

// ================= SAVE =================
async function saveEntry() {
  const text = entryText.value.trim();
  if (!text) return;

  await fetch("http://localhost:5000/api/diary", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: text })
  });

  closeModal();
  fetchEntries();
}

// ================= DELETE =================
async function deleteEntry(id) {
  if (!confirm("Delete this diary entry?")) return;

  await fetch(`http://localhost:5000/api/diary/${id}`, {
    method: "DELETE"
  });

  fetchEntries();
}
