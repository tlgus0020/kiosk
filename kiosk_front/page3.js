import { Flover,send, setDocument} from "./page3-1.js";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("flavors");

    const iceCreams = [
        { id: "1", name: "바람과 함께 사라지다", imagepath: "./images/menuimage/바람과_함께_사라지다.png" },
        { id: "2", name: "베리베리 스트로베리", imagepath: "./images/menuimage/베리베리_스트로베리.png" },
        { id: "3", name: "봉쥬르, 마카롱", imagepath: "./images/menuimage/봉쥬르__마카롱.png" },
        { id: "4", name: "블루베리 파나코타", imagepath: "./images/menuimage/블루베리_파나코타.png" },
        { id: "5", name: "사랑에 빠진 딸기", imagepath: "./images/menuimage/사랑에_빠진_딸기.png" },
        { id: "6", name: "소금 우유 아이스크림", imagepath: "./images/menuimage/소금_우유_아이스크림.png" },
        { id: "7", name: "슈팅스타", imagepath: "./images/menuimage/슈팅스타.png" },
        { id: "8", name: "아몬드 봉봉", imagepath: "./images/menuimage/아몬드_봉봉.png" },
        { id: "9", name: "아이스도쿄바나나", imagepath: "./images/menuimage/아이스도쿄바나나.png" },
        { id: "10", name: "아이스호떡", imagepath: "./images/menuimage/아이스호떡.png" },

    ];

    iceCreams.forEach(ice => {
        const iceCreamElement = Flover(ice.id, ice.name, ice.imagepath);
        root.appendChild(iceCreamElement);
    });
    
    
    setDocument();
    const sender = document.querySelector("#sender");
    sender.addEventListener("click", () => {
        send();
    })
});


