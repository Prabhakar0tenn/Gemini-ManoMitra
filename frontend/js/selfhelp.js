/* ================= TAB SWITCHING ================= */
function openTab(event, id) {
  // remove active class from all tabs
  document.querySelectorAll(".tab").forEach(tab =>
    tab.classList.remove("active")
  );

  // hide all content
  document.querySelectorAll(".tab-content").forEach(content =>
    content.classList.remove("active")
  );

  // activate clicked tab
  event.target.classList.add("active");

  // show selected content
  document.getElementById(id).classList.add("active");
}

/* ================= PDF DOWNLOAD ================= */
function downloadPDF() {
  const element = document.getElementById("selfHelpContent");

  const options = {
    margin: 0.5,
    filename: "ManoMitra_Self_Help_Guide.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: {
      unit: "in",
      format: "a4",
      orientation: "portrait"
    }
  };

  html2pdf()
    .set(options)
    .from(element)
    .save();
}
