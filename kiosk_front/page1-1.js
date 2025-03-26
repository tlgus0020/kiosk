//import './page1-1.css'

let content; 
let scriptmother;
window.onload = (() => {
  content = document.querySelector("#content")
  scriptmother = document.querySelector(".mother");
  document.getElementById("bagbtn").addEventListener("click", () => {
    // 페이지 이동만 해주면 됨
    window.location.href = "./page5.html";
  });

  // ✅ 세션스토리지에서 주문 내역 불러오기
  let val = sessionStorage.getItem("now");
  console.log("세션스토리지에서 가져온 now:", val);

  const { total, cart } = calculateTotal(val);
  console.log(`총 가격: ${total}원`);
  console.log(`총 개수: ${cart}개`);

  // ✅ form 안 input에 값 저장
  document.querySelector("#history").value = val;

  const paymentLabel = document.querySelector("#payment-label");
  if (paymentLabel) {
    paymentLabel.textContent = `₩${total.toLocaleString()} 결제하기`;
  }
  const badge = document.getElementById("cart-count");

if (badge) {
  if (cart > 0) {
    badge.textContent = cart > 9 ? "9+" : cart;
    badge.style.display = "flex";
  } else {
    badge.style.display = "none";
  }
}
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

  if (!val) return { total, cart };

  const obj = JSON.parse(val); // ✅ 문자열 → 객체

  Object.values(obj).forEach(entry => {
    const item = items.find(i => i.name === entry.size);
    if (item) {
      total += item.price;
      cart += 1;
    }
  });

  return { total, cart };
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
