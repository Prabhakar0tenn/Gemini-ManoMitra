const postBox = document.getElementById("postBox");
const postList = document.getElementById("postList");

function togglePostBox() {
  postBox.style.display =
    postBox.style.display === "none" ? "block" : "none";
}

// demo posts
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

demoPosts.forEach(renderPost);

function addPost() {
  const title = document.getElementById("postTitle").value.trim();
  const content = document.getElementById("postContent").value.trim();

  if (!title || !content) return;

  renderPost({
    title,
    content,
    date: new Date().toDateString()
  });

  document.getElementById("postTitle").value = "";
  document.getElementById("postContent").value = "";
  postBox.style.display = "none";
}

function renderPost(post) {
  const div = document.createElement("div");
  div.className = "forum-post";

  div.innerHTML = `
    <h4>${post.title}</h4>
    <small>${post.date}</small>
    <p>${post.content}</p>
  `;

  postList.prepend(div);
}
