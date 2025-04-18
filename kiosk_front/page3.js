import { Flover, send, setDocument } from "./page3-1.js";

let currentPage = 1;
let iceCreams = [];

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("flavors");
    const prevBtn = document.getElementById("prevPage");
    const nextBtn = document.getElementById("loadMore");

    // 메뉴 불러오기 함수
    function loadPage(page) {
        fetch(`http://localhost:8080/menu/page/${page}`)
            .then(res => res.json())
            .then(data => {
                if (!data || data.length === 0) {
                    alert("불러올 수 있는 데이터가 없습니다.");
                    return;
                }

                currentPage = page; // 현재 페이지 갱신

                // 데이터 가공
                iceCreams = data.map(menu => ({
                    id: String(menu.id),
                    name: menu.name,
                    imagepath: menu.img
                }));

                // 기존 아이스크림 리스트 갈아엎기
                root.innerHTML = "";
                iceCreams.forEach(ice => {
                    const iceCreamElement = Flover(ice.id, ice.name, ice.imagepath);
                    root.appendChild(iceCreamElement);
                });

                // 이전 버튼 비활성화 처리
                if (currentPage === 1) {
                    prevBtn.disabled = true;
                } else {
                    prevBtn.disabled = false;
                }
            })
            .catch(err => console.error(`페이지 ${page} 로딩 실패:`, err));
    }

    // 최초 1페이지 로딩
    loadPage(1);

    // 다음 페이지
    nextBtn.addEventListener("click", () => {
        loadPage(currentPage + 1);
    });

    // 이전 페이지
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) {
            loadPage(currentPage - 1);
        }
    });

    setDocument();

    const sender = document.querySelector("#sender");
    if (sender) {
        sender.addEventListener("click", () => {
            send();
        });
    }
});
