

let selectcount = 4;
let select = [];
let history;
let size;
let count = 1; //page2가 작동을 안해서 1개만 산다고 쳤음..
export function setDocument(props){
    const urlParams = new URLSearchParams(window.location.search);
    size = urlParams.get('size');
    console.log(size);
    switch(size){
        case "싱글레귤러":
            selectcount = 1 * count;
            break;
        case '더블주니어':
            selectcount = 2 * count;
            break;
        case '파인트':
            selectcount = 3 * count;
            break;
        case '쿼터':
            selectcount = 4 * count;
            break;
        case '패밀리':
            selectcount = 5 * count;
            break;
        case '하프갤런':
            selectcount = 6 * count;
            break;
    }
    history = urlParams.get('now');

}
export function Flover(name, imagepath) {
    const div = document.createElement("div");
    div.classList.add("icecream");

    div.innerHTML = `
        <img src="${imagepath}" alt="${name}" class="imagefile"/>
        <span>${name}</span>
    `;

    div.addEventListener("click", (event) => {
        if(select.length != selectcount){
            const imgElement = event.currentTarget.querySelector(".imagefile");
            select.push(name);
            console.log(select);
            animateToContainer(imgElement, imagepath);
        }
    });
    return div;
}
export function send(){

    let sender = document.querySelector("#send");
    let object = document.querySelector("#now");
    object.value = `${size}/${select}`;
    if(history){
        object.value = object.value+`-${history}`;
    }
    sender.submit();
    console.log("send");
}

function animateToContainer(imgElement, imagepath) {
    const container = document.getElementById("flavor-cart");
    const rect = imgElement.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const clone = imgElement.cloneNode(true);
    clone.classList.add("moving-image");

    document.body.appendChild(clone); // body에 추가

    // ✅ 초기 위치 설정 (클릭한 곳에서 시작)
    clone.style.position = "absolute";
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;

    // ✅ 1단계: 자기 자리에서 커지기
    setTimeout(() => {
        clone.style.transform = "scale(1.5)";
    }, 50);

    // ✅ 2단계: 빠르게 일직선 이동
    setTimeout(() => {
        clone.style.transition = "top 0.8s ease-in-out, left 0.8s ease-in-out, transform 0.6s ease-in-out";
        clone.style.top = `${containerRect.top}px`;
        clone.style.left = `${containerRect.left}px`;
        clone.style.transform = "scale(1)";
    }, 300); // 0.3초 후 이동 시작 (이전보다 빠르게)

    // ✅ 3단계: 최종 위치 도착 후 컨테이너에 추가
    setTimeout(() => {
        clone.remove();
        container.appendChild(createChoiceImage(imagepath));
    }, 1200); // **총 1.2초 후 컨테이너에 추가**
}

function createChoiceImage(imagepath) {
    const img = document.createElement("img");
    img.src = imagepath;
    img.classList.add("selected-icecream");

    // ✅ 클릭하면 삭제되는 이벤트 추가
    img.addEventListener("click", () => {
        img.remove()
    });

    return img;
}


