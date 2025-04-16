let content;
let scriptmother;

window.onload = () => {
  change(null, 'page1-2');
  content = document.querySelector("#content");
  scriptmother = document.querySelector(".mother");

  // 장바구니 버튼 → page5 이동
  document.getElementById("bagbtn").addEventListener("click", () => {
    window.location.href = "./page5.html";
  });

  // 세션스토리지에서 주문 내역 불러오기
  let val = sessionStorage.getItem("now");
  console.log("세션스토리지에서 가져온 now:", val);

  const { total, cart } = calculateTotal(val);
  console.log(`총 가격: ${total}원`);
  console.log(`총 개수: ${cart}개`);

  // form input에 값 저장
  document.querySelector("#history").value = val;

  // 결제 버튼 텍스트 업데이트
  const paymentLabel = document.querySelector("#payment-label");
  if (paymentLabel) {
    if (total > 0) {
      paymentLabel.textContent = `₩${total.toLocaleString()} 결제하기`;
    } else {
      paymentLabel.textContent = `결제하기`;
    }
    paymentLabel.addEventListener("click", () => {
      window.location.href = "./page5.html";
    });
  }

  // 장바구니 배지 표시
  const badge = document.getElementById("cart-count");
  if (badge) {
    if (cart > 0) {
      badge.textContent = cart > 9 ? "9+" : cart;
      badge.style.display = "flex";
    } else {
      badge.style.display = "none";
    }
  }

  // ✅ 페이지 열리자마자 page1-2 자동 실행 + 메뉴 스타일 적용
  change(null, 'page1-2');
};

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

  const obj = JSON.parse(val); // 문자열 → 객체

  Object.values(obj).forEach(entry => {
    const item = items.find(i => i.name === entry.size);
    const count = entry.count || 1;
    if (item) {
      total += item.price * count;
      cart += count;
    }
  });

  return { total, cart };
}

function change(event, path) {
  if (event) event.preventDefault();

  const allTabs = document.querySelectorAll('.menu a');
  allTabs.forEach(tab => tab.classList.remove('selected'));

  if (event && event.target.tagName === 'A') {
    // 클릭으로 들어온 경우
    event.target.classList.add('selected');
  } else if (path === 'page1-2') {
    // 페이지 로드시 자동 호출 → "아이스크림" 항목에 selected 추가
    const defaultTab = [...allTabs].find(tab => tab.textContent.trim() === '아이스크림');
    if (defaultTab) defaultTab.classList.add('selected');
  }

  // 아이스크림 탭일 때만 fetch 동작
  if (path === 'page1-2') {
    fetchHTML(path);
  }
}


window.change = change;

async function fetchHTML(filename) {
  const res = await fetch(`${filename}.html`);
  content.innerHTML = await res.text();
  executeScripts(content);
}

function executeScripts(element) {
  const scripts = element.querySelectorAll("script");
  scriptmother.innerHTML = "";
  scripts.forEach(script => {
    const newScript = document.createElement("script");
    newScript.textContent = script.textContent;
    scriptmother.appendChild(newScript);
  });
}
