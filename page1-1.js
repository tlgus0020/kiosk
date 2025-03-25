//import './page1-1.css'

let content; 
let scriptmother;
window.onload = (()=>{
  content = document.querySelector("#content")
  scriptmother = document.querySelector(".mother");
  console.log(content);
  const urlParams = new URLSearchParams(window.location.search);
  let val = urlParams.get("now");
  console.log(val);
  document.querySelector("#history").value = val;
});

function change(event,path){
    console.log(event);
    event.preventDefault();

    console.log(path);

    let url = "";

    if(path == 'page1-2'){
        url = '/page1-2';
        fetchHTML(path);
    }
   // history.pushState({},"",url + ".html");
}
window.change = change;
async function fetchHTML(filename) {
    const res = await fetch(`${filename}.html`);
    content.innerHTML = await res.text();
    executeScripts(content);
}


let products;
let container;

function executeScripts(element) {
  const scripts = element.querySelectorAll("script");
  console.log(scripts);
  scriptmother.innerHTML = "";
  scripts.forEach(script => {
    console.log(script + "1");
    const newScript = document.createElement("script");
    newScript.textContent = script.textContent;
    scriptmother.appendChild(newScript);
  })
}