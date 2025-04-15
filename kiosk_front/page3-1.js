let selectcount = 4;
let select;
let history;
let size;
let nowselecting = 0;
let imgarr;
let count = 1;

// 초기 진입 시 URL 파라미터를 기반으로 데이터 설정
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

// 화면 상태 및 초기 데이터 셋업 함수
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

    flavorChoice(count);

    if (preloadData) {
        const index = 0;
        preloadData.flavor.forEach(item => {
            let flavorObj;
    
            if (typeof item === 'string') {
                flavorObj = { id: null, name: item };
            } else {
                flavorObj = {
                    id: item.id ?? null,
                    name: item.name
                };
            }
    
            select[index].push(flavorObj);
    
            const img = document.createElement("img");
            img.src = `./images/menuimage/${flavorToFilename(flavorObj.name)}`;
            img.classList.add("selected-icecream");
    
            img.addEventListener("click", () => {
                let idx = imgarr[index].indexOf(img);
                if (idx !== -1) {
                    imgarr[index].splice(idx, 1);
                    select[index].splice(idx, 1);
                    reset();
                    img.remove();
                }
            });
    
            imgarr[index].push(img);
        });    
    }
    

    reset();
}

// 맛 선택 UI에 보여줄 아이스크림 카드 생성 함수
export function Flover(id ,name, imagepath) {
    const div = document.createElement("div");
    div.classList.add("icecream");
    div.innerHTML = `
        <img src="${imagepath}" alt="${name}" class="imagefile"/>
        <span>${name}</span>
        <input type="hidden" value="${id}"/>
    `;
    div.addEventListener("click", (event) => {
        if (select[nowselecting].length < selectcount) {
            const imgElement = event.currentTarget.querySelector(".imagefile");
            const currentIndex = nowselecting;
            select[currentIndex].push({id, name});
            animateToContainer(imgElement, imagepath, select[currentIndex].length, currentIndex);
        }
    });
    return div;
}

// 아이스크림 번호별 선택영역 생성 (1번, 2번, ...)
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

// 선택된 상태에 따라 UI를 갱신하는 함수
export function reset() {
    const container = document.getElementById("flavor-cart");
    container.innerHTML = `${nowselecting + 1}번 선택중! ${select[nowselecting].length}/${selectcount}`;
    container.innerHTML += "<br/>";
    imgarr[nowselecting].forEach(ele => {
        container.appendChild(ele);
    });

    const flavorContainers = document.querySelectorAll("#flavorChoice .menu-container");

    flavorContainers.forEach((div, i) => {
    // 기존 preview 제거
    const oldPreview = div.querySelector(".preview-image-overlay");
    if (oldPreview) oldPreview.remove();

    const labelNode = Array.from(div.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
    if (select[i].length < selectcount) {
        if (labelNode) labelNode.nodeValue = `${i + 1}번 미선택`;
    } else {
        if (labelNode) labelNode.nodeValue = `${i + 1}번 선택`;

        // 기존 이미지 가져오기
        const baseImg = div.querySelector("img");

        // img-wrapper가 없으면 생성해서 이미지 감싸기
        let imgWrapper = baseImg.closest(".img-wrapper");
        if (!imgWrapper) {
            imgWrapper = document.createElement("div");
            imgWrapper.classList.add("img-wrapper");
            imgWrapper.style.position = "relative";
            imgWrapper.style.display = "inline-block";

            baseImg.replaceWith(imgWrapper);
            imgWrapper.appendChild(baseImg);
        }

        // 겹칠 size 이미지
        const previewImg = document.createElement("img");
        previewImg.src = `./images/images2/${size}.png`;
        previewImg.classList.add("preview-image-overlay");
        imgWrapper.appendChild(previewImg);
    }
});

}


// 선택 완료 시 데이터 저장 및 다음 페이지로 이동
export function send() {
    const isComplete = select.every(arr => arr.length === selectcount);

    if (!isComplete) {
        alert("선택 다 안함!!");
        return;
    }

    const editingKey = sessionStorage.getItem("editingKey");
    let obj = history;

    if (editingKey && obj[editingKey]) {
        obj[editingKey].flavor = [...select[0]];
        sessionStorage.removeItem("editingKey");
    } else {
        select.forEach(element => {
            const id = uuidv4();
            obj[id] = {
                flavor: element.map(f => ({ id: f.id ?? null, name: f.name })),
                size: size
            };
        });
    }

    sessionStorage.setItem('now', JSON.stringify(obj));
    sessionStorage.removeItem("edit");
    document.querySelector("#send").submit();
}

// 맛 클릭 시 애니메이션 처리 및 이미지 추가
function animateToContainer(imgElement, imagepath, value, targetIndex) {
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

        const finalImg = document.createElement("img");
        finalImg.src = imagepath;
        finalImg.alt = "flavor";
        finalImg.classList.add("selected-icecream");
        finalImg.addEventListener("click", () => {
            let idx = imgarr[targetIndex].indexOf(finalImg);
            if (idx !== -1) {
                imgarr[targetIndex].splice(idx, 1);
                select[targetIndex].splice(idx, 1);
                reset();
                finalImg.remove();
            }
        });

        imgarr[targetIndex].push(finalImg);

        if (targetIndex === nowselecting) {
            container.appendChild(finalImg);
        }

        if (select[targetIndex].length === selectcount) {
            for (let i = targetIndex + 1; i < select.length; i++) {
                if (select[i].length < selectcount) {
                    nowselecting = i;
                    break;
                }
            }
        }

        reset();
    }, 1200);
}

// 맛 이름을 파일명 형식으로 변환
function flavorToFilename(name) {
    return name
        .trim()
        .replace(/\s+/g, "_")
        .replace(/[^\w가-힣_]/g, "")
        + ".png";
}

// 고유 ID 생성용 UUID 함수
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
