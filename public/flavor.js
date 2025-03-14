import { Flover } from "./main.js";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");

    const iceCreams = [
        { name: "31요거트", imagepath: "./menuimage/31요거트.png"},
        { name: "그린티", imagepath: "./menuimage/그린티.png"},
        { name: "나주배 소르베", imagepath: "./menuimage/나주배_소르베.png"},
    ];

    iceCreams.forEach(ice => {
        const iceCreamElement = Flover(ice.name, ice.imagepath);
        root.appendChild(iceCreamElement);
    });
});
