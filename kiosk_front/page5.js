const itemData = [
    { name: "싱글레귤러", price: 3200, img: "images/싱글레귤러-removebg-preview.png" },
    { name: "싱글킹", price: 4000, img: "images/싱글킹-removebg-preview.png" },
    { name: "더블주니어", price: 4300, img: "images/더블주니어-removebg-preview.png" },
    { name: "더블레귤러", price: 6200, img: "images/더블레귤러-removebg-preview.png" },
    { name: "파인트", price: 8200, img: "images/파인트-removebg-preview.png" },
    { name: "쿼터", price: 15500, img: "images/쿼터-removebg-preview.png" },
    { name: "패밀리", price: 22000, img: "images/패밀리-removebg-preview.png" },
    { name: "하프갤런", price: 26500, img: "images/하프갤런-removebg-preview.png" }
];

const list = document.querySelector("#items");
let itemList = [];

listOrder();

function listOrder() {
    const raw = sessionStorage.getItem("now");
    if (!raw) return;

    const data = JSON.parse(raw);

    Object.entries(data).forEach(([uuid, entry]) => {
        const matched = itemData.find(item => item.name === entry.size);
        if (!matched) return;

        let li = document.createElement("li");
        li.classList.add("item");

        let count = entry.count || 1;

        li.innerHTML = `
            <div class="item">
              <img src="${matched.img}">
              <div class="itemtextblock" style="text-align: center;">
                <div style="font-weight: bold;">${matched.name}</div>
                <div style="font-size: small;">(콘/컵) 컵(포장불가)</div>
              </div>
              <div class="selectcount">
                <div class="minus" style="font-size: 40px; cursor:pointer;">-</div>
                <div class="count" style="font-size: 40px;">${count}</div>
                <div class="plus" style="font-size: 40px; cursor:pointer;">+</div>
              </div>
              <div>
                <img class="edit-btn" src="./images/props/Frame 112-1.png" style="cursor:pointer;">
              </div>
              <div class="del" style="cursor:pointer;">
                <img src="./images/props/Frame 113.png">
              </div>
            </div>
        `;

        const plusBtn = li.querySelector(".plus");
        const minusBtn = li.querySelector(".minus");
        const countDisplay = li.querySelector(".count");
        const delBtn = li.querySelector(".del");
        const editBtn = li.querySelector(".edit-btn");

        plusBtn.addEventListener("click", () => {
            count++;
            countDisplay.textContent = count;
            itemDataObj.count = count;

            data[uuid].count = count;
            sessionStorage.setItem("now", JSON.stringify(data));

            updateTotal();
        });

        minusBtn.addEventListener("click", () => {
            if (count > 1) {
                count--;
                countDisplay.textContent = count;
                itemDataObj.count = count;

                data[uuid].count = count;
                sessionStorage.setItem("now", JSON.stringify(data));

                updateTotal();
            }
        });

        delBtn.addEventListener("click", () => {
            list.removeChild(li);
            itemList = itemList.filter(i => i.element !== li);

            // ✅ 세션스토리지에서도 삭제
            delete data[uuid];
            sessionStorage.setItem("now", JSON.stringify(data));

            updateTotal();
        });

        editBtn.addEventListener("click", () => {
            const size = entry.size;
            const count = entry.count || 1;

            // ✅ 수정할 항목을 따로 저장
            sessionStorage.setItem("edit", JSON.stringify({ [uuid]: entry }));
            sessionStorage.setItem("editingKey", uuid);

            location.href = `page3.html?size=${encodeURIComponent(size)}&count=${count}&editKey=${uuid}`;
        });

        const itemDataObj = { element: li, matchedItem: matched, count: count };
        itemList.push(itemDataObj);
        list.appendChild(li);
    });

    updateTotal();
}

function updateTotal() {
    const total = itemList.reduce((sum, item) => {
        return sum + item.matchedItem.price * item.count;
    }, 0);

    const totalDiv = document.getElementById("totalPrice");
    if (totalDiv) {
        totalDiv.textContent = `₩${total.toLocaleString()}`;
    }
}
