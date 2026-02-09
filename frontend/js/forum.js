const postBox = document.getElementById("postBox");
const postList = document.getElementById("postList");

const API_BASE = "https://gemini-manomitra.onrender.com";

/* ---------------- TOGGLE POST BOX ---------------- */
function togglePostBox() {
  postBox.style.display =
    postBox.style.display === "none" ? "block" : "none";
}

/* ---------------- DEMO POSTS (fallback only) ---------------- */
const demoPosts = [
  {
    title: "Feeling anxious before exams",
    content:
      "Lately I feel very anxious before exams. My heart races and I can't focus. Any tips?",
    date: "Feb 10, 2026"
  },
  {
    title: "How do you calm your mind?",
    content:
      "What helps you relax when your thoughts won't stop?",
    date: "Feb 9, 2026"
  }
];

/* ---------------- LOAD POSTS FROM BACKEND ---------------- */
async function loadPosts() {
  try {
    const res = await fetch(`${API_BASE}/forum`);
    const data = await res.json();

    postList.innerHTML = "";

    if (Array.isArray(data) && data.length > 0) {
      data.forEach(renderPost);
    } else {
      demoPosts.forEach(renderPost);
    }
  } catch (err) {
    console.error("Forum load failed:", err);
    demoPosts.forEach(renderPost);
  }
}

/* ---------------- ADD NEW POST ---------------- */
async function addPost() {
  const title = document.getElementById("postTitle").value.trim();
  const content = document.getElementById("postContent").value.trim();

  if (!title || !content) return;

  const postData = {
    title,
    content
  };

  try {
    const res = await fetch(`${API_BASE}/forum`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    });

    const savedPost = await res.json();

    renderPost(savedPost);
  } catch (err) {
    console.error("Post save failed:", err);

    // fallback local render
    renderPost({
      title,
      content,
      date: new Date().toDateString()
    });
  }

  document.getElementById("postTitle").value = "";
  document.getElementById("postContent").value = "";
  postBox.style.display = "none";
}

/* ---------------- RENDER POST ---------------- */
function renderPost(post) {
  const div = document.createElement("div");
  div.className = "forum-post";

  div.innerHTML = `
    <h4>${post.title}</h4>
    <small>${post.date || new Date().toDateString()}</small>
    <p>${post.content}</p>
  `;

  postList.prepend(div);
}

/* ---------------- INIT ---------------- */
loadPosts();
