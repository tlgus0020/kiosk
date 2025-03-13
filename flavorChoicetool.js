export function FloverChoice(name, imagepath) {
    const div = document.createElement("div");
    div.classList.add("add-icecream");
    
    div.innerHTML = `
    <img src="./image/Rectangle 9.png">
    <img src="${imagepath}" alt="${name}" class="imagefile"/>
    <br>
    <span>${name}</span>
    `;

    div.addEventListener("click", () => {
        console.log('클릭됨');
    });

    return div;
}
