
let content = document.querySelector("#content2"); 

function change(event,path){
    console.log(event);
    event.preventDefault();

    console.log(path);

    let url = "";

    if(path == 'pointdiscount'){
        console.log("if 실행 됬음")
        url = '/pointdiscount';
        fetchHTML(path);
        console.log("fetchHTML 실행 됬음")
    }
    history.pushState({},"",url);
}

async function fetchHTML(filename) {
    const res = await fetch(`${filename}.html`);
    content.innerHTML=  await res.text();

}