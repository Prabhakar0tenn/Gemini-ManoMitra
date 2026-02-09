const diaryList = document.getElementById("diaryList");
const modal = document.getElementById("modal");
const entryText = document.getElementById("entryText");
const modalTitle = document.getElementById("modalTitle");
const emptyState = document.getElementById("emptyState");

const API_BASE = "https://gemini-manomitra.onrender.com";

/* ================= LOAD ================= */
fetchEntries();

async function fetchEntries() {
  try {
    const res = await fetch(`${API_BASE}/api/diary`);
    const data = await res.json();

    diaryList.innerHTML = "";

    if (!data || data.length === 0) {
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
  } catch (err) {
    console.error("Failed to load diary entries:", err);
    emptyState.style.display = "block";
  }
}

/* ================= MODAL ================= */
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

/* ================= SAVE ================= */
async function saveEntry() {
  const text = entryText.value.trim();
  if (!text) return;

  try {
    await fetch(`${API_BASE}/api/diary`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text })
    });
  } catch (err) {
    console.error("Failed to save entry:", err);
  }

  closeModal();
  fetchEntries();
}

/* ================= DELETE ================= */
async function deleteEntry(id) {
  if (!confirm("Delete this diary entry?")) return;

  try {
    await fetch(`${API_BASE}/api/diary/${id}`, {
      method: "DELETE"
    });
  } catch (err) {
    console.error("Failed to delete entry:", err);
  }

  fetchEntries();
}
