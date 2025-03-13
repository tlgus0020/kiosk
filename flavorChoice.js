import { FloverChoice } from "./flavorChoicetool.js";

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("flavorChoice");

    const iceCreams = [
        { name: "31요거트", imagepath: "./menuimage/31요거트.png"},
    ];

    iceCreams.forEach(ice => {
        const iceCreamElement = FloverChoice(ice.name, ice.imagepath);
        root.appendChild(iceCreamElement);
    });
});
