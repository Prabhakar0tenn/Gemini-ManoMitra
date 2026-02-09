const grid = document.getElementById("relaxGrid");

const resources = [
  { title:"White Noise", category:"sleep", duration:"600 min", icon:"🌙", youtubeUrl:"https://www.youtube.com/watch?v=nMfPqeZjc2c" },
  { title:"Brown Noise", category:"sleep", duration:"480 min", icon:"", youtubeUrl:"https://www.youtube.com/watch?v=RqzGzwTY-6w" },
  { title:"Calming Anxiety Music", category:"anxiety", duration:"360 min", icon:"💙", youtubeUrl:"https://www.youtube.com/watch?v=mr4AVNZwdK0" },
  { title:"Deep Focus Music", category:"focus", duration:"240 min", icon:"🎧", youtubeUrl:"https://www.youtube.com/watch?v=u5Us3vMaUKk" },
  { title:"Meditation Binaural", category:"meditation", duration:"30 min", icon:"", youtubeUrl:"https://www.youtube.com/watch?v=0tfLqQzWQpc" },
  { title:"Deep Healing Sleep", category:"sleep", duration:"8 hr", icon:"😴", youtubeUrl:"https://www.youtube.com/watch?v=xsfyb1pStdw" },
  { title:"Alpha Waves", category:"focus", duration:"60 min", icon:"", youtubeUrl:"https://www.youtube.com/watch?v=u3papaX85MA" }
];

let current = "all";

function render() {
  grid.innerHTML = "";
  resources.filter(r => current==="all" || r.category===current)
    .forEach(r => {
      grid.innerHTML += `
        <div class="relax-card">
          <img src="https://img.youtube.com/vi/${r.youtubeUrl.split("v=")[1]}/hqdefault.jpg">
          <div class="body">
            <h4>${r.icon} ${r.title}</h4>
            <div class="meta">${r.category} • ${r.duration}</div>
            <a href="${r.youtubeUrl}" target="_blank" class="btn">Play ▶</a>
          </div>
        </div>
      `;
    });
}
render();

function filter(cat){
  current = cat;
  document.querySelectorAll(".tabs button").forEach(b=>b.classList.remove("active"));
  event.target.classList.add("active");
  render();
}

async function savePlaylist(){
  const name = document.getElementById("plistName").value;
  const url = document.getElementById("plistUrl").value;
  if(!name || !url) return alert("Fill both");

  await fetch("http://localhost:5000/api/playlists",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ name, items:[{ title:name, youtubeUrl:url }] })
  });

  alert("Playlist saved ");
}
