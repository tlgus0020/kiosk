import './page6.css'

let content = document.querySelector("#content2"); 

function change(event,path){
    console.log(event);
    event.preventDefault();

    console.log(path);

    let url = "";

    if(path == 'pointdiscount'){
        url = '/pointdiscount';
        fetchHTML(path);
    }
    history.pushState({},"",url);
}

async function fetchHTML(filename) {
    const res = await fetch(`${filename}.html`);
    content.innerHTML=  await res.text();

}