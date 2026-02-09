// ================= GLOBAL =================
let selectedCounsellor = "";

// ================= SELECT COUNSELLOR =================
function selectCounsellor(card) {
  // remove active from all
  document.querySelectorAll(".selectable").forEach(c =>
    c.classList.remove("active")
  );

  // add active to clicked
  card.classList.add("active");

  // get counsellor name
  selectedCounsellor = card.querySelector("b").innerText;

  // enable button
  document.getElementById("bookBtn").disabled = false;
}

// ================= SEND EMAIL =================
function sendEmail() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const notes = document.getElementById("notes").value.trim();

  if (!selectedCounsellor) {
    alert("Please select a counsellor.");
    return;
  }

  if (!name || !email) {
    alert("Please enter your name and email.");
    return;
  }

  const params = {
    name: name,
    email: email,
    counsellor: selectedCounsellor,
    notes: notes || "No additional notes"
  };

  emailjs
    .send(
      "service_n88mq6v",     // ✅ SERVICE ID
      "template_poj80h3",    // ✅ TEMPLATE ID
      params
    )
    .then(() => {
      alert("✅ Session request sent successfully!");

      // reset form
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("notes").value = "";
      document.getElementById("bookBtn").disabled = true;

      document.querySelectorAll(".selectable").forEach(c =>
        c.classList.remove("active")
      );

      selectedCounsellor = "";
    })
    .catch(error => {
      console.error("EmailJS Error:", error);
      alert("❌ Failed to send request. Please try again.");
    });
}
