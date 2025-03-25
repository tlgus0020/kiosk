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
  const {total, cart} = calculateTotal(val);
  console.log(`총 가격: ${total}원`);
  console.log(`총 개수: ${cart}개`);
  console.log(`정보: ${info}`);

  document.querySelector("#history").value = val;
});

const items = [
  { name: "싱글레귤러", price: 3200 },
  { name: "싱글킹", price: 4000 },
  { name: "더블주니어", price: 4300 },
  { name: "더블레귤러", price: 6200 },
  { name: "파인트", price: 8200 },
  { name: "쿼터", price: 15500 },
  { name: "패밀리", price: 22000 },
  { name: "하프갤런", price: 26500 }
];

function calculateTotal(val) {
  let total = 0;
  let cart = 0;
  let info ="";
  items.forEach(item => {
    const count = val.split(item.name).length - 1;
    total += count * item.price;
    cart += count;
  });

  return {total, cart};
}



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