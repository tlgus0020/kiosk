const express = require("express");
const path = require("path");
const app = express();
// 전역변수 port 를 설정하는 느낌
app.set("port", 5555);

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "./flover.html"));
});

app.get("/order", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "./주문처리/order.html"));
});
app.post("/", (req, res) => {
    res.send("hello express");
});
app.get("/about", (req, res) => {
    res.send("hello express");
});
app.listen(app.get("port"), () => {
    console.log("익스프레스 서버 실행");
});