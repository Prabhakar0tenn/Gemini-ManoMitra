const hour = new Date().getHours();
let greeting =
  hour < 12 ? "Good morning" :
  hour < 18 ? "Good afternoon" :
  "Good evening";

document.getElementById("greet").innerText =
  `${greeting}, User!`;
function toggle(el) {
  el.parentElement.classList.toggle("open");
}
