const data = [{name : "싱글레귤러", desc : "random text options",count : 1},{name : "싱글레귤러", desc : "random text options",count : 555}]



const list = document.querySelector("#items");
listOrder();
function listOrder(){
    data.forEach(element => {
        let item = document.createElement("li");
        item.id = "item"
        item.innerHTML = `
        <div class="item">
        <img src="./images/props/싱글레귤러-removebg-preview-1.png">
        <div class="itemtextblock" style="text-align: center;">
            <div style="font-weight: bold;">
                ${element.name}
            </div>
            <div style="font-size: small;">
                ${element.desc}
            </div>
        </div>
        <div class="selectcount">
            <div id="minus" style="font-size: 40px;"> 
                -
            </div>
            <div id="count" style="font-size: 40px;">
                ${element.count}
            </div>
            <div id="plus"style="font-size: 40px;">
                +
            </div>
        </div>
        <div>
            <img src="./images/props/Frame 112-1.png">
        </div>
        <div id="del">
            <img src="./images/props/Frame 113.png">
        </div>
    </div>`
    item.querySelector("#plus").addEventListener('click', ()=>{
        element.count++;
        item.querySelector("#count").textContent = element.count;
    });
    item.querySelector("#minus").addEventListener('click', ()=>{
        if(element.count != 1){
            element.count--;
            item.querySelector("#count").textContent = element.count;
        }
    });
    item.querySelector("#del").addEventListener('click', ()=>{
       list.removeChild(item); 
    })
    list.appendChild(item);
    });
}