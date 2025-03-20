const menuData = [
    { name: "싱글레귤러", price: 3200, img: "images/싱글레귤러-removebg-preview.png" },
    { name: "싱글킹", price: 4000, img: "images/싱글킹-removebg-preview.png" },
    { name: "더블주니어", price: 4300, img: "images/더블주니어-removebg-preview.png" },
    { name: "더블레귤러", price: 6200, img: "images/더블레귤러-removebg-preview.png" },
    { name: "파인트", price: 8200, img: "images/파인트-removebg-preview.png" },
    { name: "쿼터", price: 15500, img: "images/쿼터-removebg-preview.png" },
    { name: "패밀리", price: 22000, img: "images/패밀리-removebg-preview.png" },
    { name: "하프갤런", price: 26500, img: "images/하프갤런-removebg-preview.png" }
];

const menuContainer = document.getElementById("menu");
const checkoutButton = document.getElementById("checkout");
const cartIcon = document.querySelector(".cart-container > img"); // 🛍 장바구니 이미지 가져오기

// ✅ 기존 cartCount 요소 제거하고, 장바구니 이미지 안에 추가
let cartCount = document.createElement("span");
cartCount.classList.add("cart-count");
cartCount.textContent = "0"; // 초기값 설정
cartIcon.parentElement.appendChild(cartCount); // 부모 요소에 추가

let cart = []; // 장바구니 배열

function createMenuItem(item) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("menu-item");

    // 아이템 클릭 시 장바구니 추가 이벤트
    itemDiv.addEventListener("click", () => addToCart(item));

    const img = document.createElement("img");
    img.src = item.img;
    img.alt = item.name;

    const name = document.createElement("p");
    name.classList.add("item-name");
    name.textContent = item.name;

    const price = document.createElement("p");
    price.classList.add("item-price");
    price.textContent = `₩${item.price.toLocaleString()}`;

    itemDiv.appendChild(img);
    itemDiv.appendChild(name);
    itemDiv.appendChild(price);

    return itemDiv;
}

// 장바구니에 아이템 추가하는 함수
function addToCart(item) {
    cart.push(item);
    updateCartUI();
}

// 장바구니 UI 업데이트
function updateCartUI() {
    let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    checkoutButton.textContent = `₩${totalPrice.toLocaleString()} 결제하기`;

    // ✅ 장바구니 개수 업데이트
    cartCount.textContent = cart.length;
    cartCount.style.display = cart.length > 0 ? "block" : "none"; // 1개 이상이면 보이게
}

menuData.forEach(item => {
    menuContainer.appendChild(createMenuItem(item));
});
