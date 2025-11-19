console.log("Script is running!");
const params = new URLSearchParams(window.location.hash.slice(1));
console.log("Params:", params.toString());
const name = params.get("name") || "";
console.log("Name:", name);
document.querySelector(".invite-name").textContent = `Thân gởi ${name} 🌸`;


document.getElementById('mapBtn').addEventListener('click', () => {
    window.open('https://maps.app.goo.gl/EEKoGgwdMPJNjq568', '_blank');
});
