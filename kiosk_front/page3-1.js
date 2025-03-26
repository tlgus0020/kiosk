

let selectcount = 4;
let select;
let history;
let size;
let nowselecting = 0;
let imgarr;
let count = 1; //page2가 작동을 안해서 1개만 산다고 쳤음..
export function setDocument(props){
    flavorChoice();
    const urlParams = new URLSearchParams(window.location.search);
    size = urlParams.get('size');
    count = urlParams.get('count');
    console.log(size);
    switch(size){
        case "싱글레귤러":
            selectcount = 1;
            break;
        case '더블주니어':
            selectcount = 2;
            break;
        case '파인트':
            selectcount = 3;
            break;
        case '쿼터':
            selectcount = 4;
            break;
        case '패밀리':
            selectcount = 5;
            break;
        case '하프갤런':
            selectcount = 6;
            break;
    }
    select = new Array(parseInt(count)).fill(null).map(()=> []);
    imgarr = new Array(parseInt(count)).fill(null).map(()=> []);
    console.log(select);

    history = JSON.parse(sessionStorage.getItem('now'));
    if(!history){
        history = {};
    }
    console.log(history);
    //history = urlParams.get('now');
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
        if(select[nowselecting].length != selectcount){
            const imgElement = event.currentTarget.querySelector(".imagefile");
            select[nowselecting].push(name);
            animateToContainer(imgElement, imagepath,select[nowselecting].length);
            reset();
        }
    });
    return div;
}

export function flavorChoice(count) {
    const flavorContainer = document.getElementById("flavorChoice");

    if (!flavorContainer) {
        console.error("⚠️ `flavorChoice` 요소를 찾을 수 없습니다!");
        return;
    }

    flavorContainer.innerHTML = ""; // 기존 요소 초기화

    for (let i = 0; i < count; i++) {
        let count = i;

        const div = document.createElement("div");
        const img = document.createElement("img");
        div.innerText = count+1 +"번 미선택";
        img.src = "./images/image/Rectangle 9.png";
        img.alt = `Flavor ${i + 1}`;
        img.addEventListener('click', () => {
            nowselecting = count;
            reset();
            console.log(count);
        })
        //img.classList.add("menu-container");
        div.classList.add("menu-container");
        div.appendChild(img);

        flavorContainer.appendChild(div);
    }
}


export function reset(){
    let box = document.querySelector("#flavor-cart");
    box.textContent = `${nowselecting+1}번 선택중! ${select[nowselecting].length}/${selectcount}`
    const container = document.getElementById("flavor-cart");
    imgarr[nowselecting].forEach((ele)=>{
        container.appendChild(ele);
    })
}
export function send(){

    let isok = true;
    select.forEach(element => {
        if(element.length != selectcount){
            isok = false;
        }
    });
    if(isok){
    let sender = document.querySelector("#send");
    let object = document.querySelector("#now");

    
    let obj = history;
    let nowvalue;
    select.forEach(element => {
        console.log(element);
        obj[uuidv4()] = {flavor : element, size : size};
    });
    sessionStorage.setItem('now',JSON.stringify(obj));

    sender.submit();
    console.log("send");
    }
    else{
        alert("선택 다 안함!!")
    }
}

function animateToContainer(imgElement, imagepath,value) {
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
        container.appendChild(createChoiceImage(imagepath,value));
    }, 1200); // **총 1.2초 후 컨테이너에 추가**
}


function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
function createChoiceImage(imagepath,value) {
    const img = document.createElement("img");
    img.src = imagepath;
    img.classList.add("selected-icecream");
    console.log(imgarr);
    // ✅ 클릭하면 삭제되는 이벤트 추가
    img.addEventListener("click", () => {
        console.log(value);
        let idx = 0
        let find = false;
        console.log()
        imgarr[nowselecting].forEach(ele => {
            console.log("소"+ ele.src);
            if(ele.src === img.src){
                console.log("찾음");
                find = true;
            }else if(!find){
                idx++;
            }
        });
        imgarr[nowselecting].splice(idx,1);
        select[nowselecting].splice(idx,1);
        reset();
        img.remove()
    });
    imgarr[nowselecting].push(img);

    return img;
}


