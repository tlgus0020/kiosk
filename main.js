export function Flover(name, imagepath) {
    const div = document.createElement("div");
    div.innerHTML = `
        <img src="${imagepath}" alt="${name}" class="imagefile"/>
        <br>
        <span>${name}</span>
    `;

    div.addEventListener("click", () => {
        console.log(`${name} 클릭됨!`);
    });

    return div;
}
