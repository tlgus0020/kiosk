export function flavorChoice(count) {
    const flavorContainer = document.getElementById("flavorChoice");

    if (!flavorContainer) {
        console.error("⚠️ `flavorChoice` 요소를 찾을 수 없습니다!");
        return;
    }

    flavorContainer.innerHTML = ""; // 기존 요소 초기화

    for (let i = 0; i < count; i++) {
        const img = document.createElement("img");
        img.src = "./image/Rectangle 9.png";
        img.alt = `Flavor ${i + 1}`;
        img.classList.add("menu-container");
        flavorContainer.appendChild(img);
    }
}
