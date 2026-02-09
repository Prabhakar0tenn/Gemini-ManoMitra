function openTab(id) {
  document.querySelectorAll(".tab").forEach(tab => tab.classList.remove("active"));
  document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));

  event.target.classList.add("active");
  document.getElementById(id).classList.add("active");
}

function downloadPDF() {
  const element = document.getElementById("selfHelpContent");

  const options = {
    margin: 0.5,
    filename: 'ManoMitra_Self_Help_Guide.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(options).from(element).save();
}
