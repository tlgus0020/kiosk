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

function createMenuItem(item) {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("menu-item");
    
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

menuData.forEach(item => {
    menuContainer.appendChild(createMenuItem(item));
});