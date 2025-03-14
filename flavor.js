import { Flover } from "./flavortool.js";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("flavors");

    const iceCreams = [
        { name: "바람과 함께 사라지다", imagepath: "./menuimage/바람과_함께_사라지다.png" },
        { name: "베리베리 스트로베리", imagepath: "./menuimage/베리베리_스트로베리.png" },
        { name: "봉쥬르, 마카롱", imagepath: "./menuimage/봉쥬르__마카롱.png" },
        { name: "블루베리 파나코타", imagepath: "./menuimage/블루베리_파나코타.png" },
        { name: "사랑에 빠진 딸기", imagepath: "./menuimage/사랑에_빠진_딸기.png" },
        { name: "소금 우유 아이스크림", imagepath: "./menuimage/소금_우유_아이스크림.png" },
        { name: "슈팅스타", imagepath: "./menuimage/슈팅스타.png" },
        { name: "아몬드 봉봉", imagepath: "./menuimage/아몬드_봉봉.png" },
        { name: "아이스도쿄바나나", imagepath: "./menuimage/아이스도쿄바나나.png" },
        { name: "아이스호떡", imagepath: "./menuimage/아이스호떡.png" },

    ];

    iceCreams.forEach(ice => {
        const iceCreamElement = Flover(ice.name, ice.imagepath);
        root.appendChild(iceCreamElement);
    });
});
