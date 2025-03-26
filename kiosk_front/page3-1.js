// page3-1.js
let selectcount = 4;
let select;
let history;
let size;
let nowselecting = 0;
let imgarr;
let count = 1;

window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    size = params.get("size");
    count = parseInt(params.get("count"));

    if (size && count) {
        const editKey = params.get("editKey");
        if (editKey) {
            const editData = JSON.parse(sessionStorage.getItem("edit"));
            if (editData && editData[editKey]) {
                sessionStorage.setItem("editingKey", editKey);
                history = JSON.parse(sessionStorage.getItem("now")) || {};
                setDocument(editData[editKey]);
                return;
            }
        }
        setDocument();
    } else {
        alert("잘못된 접근입니다. 처음부터 다시 선택해주세요.");
        location.href = "page1-1.html";
    }
});

export function setDocument(preloadData = null) {
    switch(size){
        case "싱글레귤러": case "싱글킹": selectcount = 1; break;
        case "더블주니어": case "더블레귤러": selectcount = 2; break;
        case "파인트": selectcount = 3; break;
        case "쿼터": selectcount = 4; break;
        case "패밀리": selectcount = 5; break;
        case "하프갤런": selectcount = 6; break;
    }

    select = Array.from({length: count}, () => []);
    imgarr = Array.from({length: count}, () => []);

    history = JSON.parse(sessionStorage.getItem("now")) || {};

    if (preloadData) {
        preloadData.flavor.forEach((name, i) => {
            if (select[i]) {
                select[i].push(name);
                const img = document.createElement("img");
                img.src = `./images/menuimage/${name.replace(/\s/g, "_")}.png`;
                img.classList.add("selected-icecream");
                img.addEventListener("click", () => {
                    let idx = imgarr[nowselecting].indexOf(img);
                    if (idx !== -1) {
                        imgarr[nowselecting].splice(idx, 1);
                        select[nowselecting].splice(idx, 1);
                        reset();
                        img.remove();
                    }
                });
                imgarr[i].push(img);
            }
        });
    }

    flavorChoice(count);
    reset();
}

export function Flover(name, imagepath) {
    const div = document.createElement("div");
    div.classList.add("icecream");
    div.innerHTML = `
        <img src="${imagepath}" alt="${name}" class="imagefile"/>
        <span>${name}</span>
    `;
    div.addEventListener("click", (event) => {
        if (select[nowselecting].length < selectcount) {
            const imgElement = event.currentTarget.querySelector(".imagefile");
            select[nowselecting].push(name);
            animateToContainer(imgElement, imagepath, select[nowselecting].length);
            reset();
        }
    });
    return div;
}

export function flavorChoice(count) {
    const flavorContainer = document.getElementById("flavorChoice");
    if (!flavorContainer) return;
    flavorContainer.innerHTML = "";
    for (let i = 0; i < count; i++) {
        const div = document.createElement("div");
        const img = document.createElement("img");
        div.innerText = `${i + 1}번 미선택`;
        img.src = "./images/image/Rectangle 9.png";
        img.alt = `Flavor ${i + 1}`;
        img.addEventListener("click", () => {
            nowselecting = i;
            reset();
        });
        div.classList.add("menu-container");
        div.appendChild(img);
        flavorContainer.appendChild(div);
    }
}

export function reset() {
    const container = document.getElementById("flavor-cart");
    container.innerHTML = `${nowselecting + 1}번 선택중! ${select[nowselecting].length}/${selectcount}`;
    imgarr[nowselecting].forEach(ele => {
        container.appendChild(ele);
    });
}

export function send() {
    const isComplete = select.every(arr => arr.length === selectcount);

    if (!isComplete) {
        alert("선택 다 안함!!");
        return;
    }

    const editingKey = sessionStorage.getItem("editingKey");
    let obj = history;

    if (editingKey && obj[editingKey]) {
        // 🔁 수정 모드일 경우: 기존 값 덮어쓰기
        obj[editingKey].flavor = [...select[0]];
        sessionStorage.removeItem("editingKey");
    } else {
        // 🆕 새로 추가하는 경우
        select.forEach(element => {
            const id = uuidv4();
            obj[id] = {
                flavor: element,
                size: size
            };
        });
    }

    sessionStorage.setItem('now', JSON.stringify(obj));
    sessionStorage.removeItem("edit"); // edit 데이터도 정리!
    document.querySelector("#send").submit();
}


function animateToContainer(imgElement, imagepath, value) {
    const container = document.getElementById("flavor-cart");
    const rect = imgElement.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const clone = imgElement.cloneNode(true);
    clone.classList.add("moving-image");
    document.body.appendChild(clone);
    clone.style.position = "absolute";
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    setTimeout(() => clone.style.transform = "scale(1.5)", 50);
    setTimeout(() => {
        clone.style.transition = "top 0.8s ease, left 0.8s ease, transform 0.6s ease";
        clone.style.top = `${containerRect.top}px`;
        clone.style.left = `${containerRect.left}px`;
        clone.style.transform = "scale(1)";
    }, 300);
    setTimeout(() => {
        clone.remove();
        container.appendChild(createChoiceImage(imagepath, value));
    }, 1200);
}

function createChoiceImage(imagepath, value) {
    const img = document.createElement("img");
    img.src = imagepath;
    img.classList.add("selected-icecream");
    img.addEventListener("click", () => {
        let idx = imgarr[nowselecting].indexOf(img);
        if (idx !== -1) {
            imgarr[nowselecting].splice(idx, 1);
            select[nowselecting].splice(idx, 1);
            reset();
            img.remove();
        }
    });
    imgarr[nowselecting].push(img);
    return img;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
