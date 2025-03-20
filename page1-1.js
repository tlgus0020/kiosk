import './page1-1.css'

let content = document.querySelector("#content"); 

function change(event,path){
    console.log(event);
    event.preventDefault();

    console.log(path);

    let url = "";

    if(path == 'icecream'){
        url = '/icecream';
        fetchHTML(path);
    }
    history.pushState({},"",url);
}

async function fetchHTML(filename) {
    const res = await fetch(`${filename}.html`);
    content.innerHTML=  await res.text();

executeScripts(content);
}
function executeScripts(element) {
  const scripts = element.querySelectorAll("script");
  scripts.forEach(script => {
    const newScript = document.createElement("script");
    newScript.textContent = script.textContent;
    document.body.appendChild(newScript);
  })
}