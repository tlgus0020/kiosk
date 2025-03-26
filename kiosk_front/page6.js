window.onload = () => {
    // 세션 스토리지에서 주문 내역 가져오기
    let val = sessionStorage.getItem("now");
    const { total } = calculateTotal(val);

    // HTML에서 총 금액을 표시할 요소 선택
    const finalAmountElement = document.querySelector("#finalAmount");
    if (finalAmountElement) {
        finalAmountElement.textContent = `₩ ${total.toLocaleString()}`;
        sessionStorage.setItem("finalAmount", total); // finalAmount 값을 sessionStorage에 저장
    }

    const finalAmountOrderElement = document.querySelector("#finalAmountOrder");
    if (finalAmountOrderElement) {
        finalAmountOrderElement.textContent = `₩ ${total.toLocaleString()}`; // 총 주문금액을 표시
        sessionStorage.setItem("finalAmountOrder", total); // finalAmountOrder 값을 sessionStorage에 저장
    }
};


// 주문 내역에서 총 금액 계산
function calculateTotal(val) {
    let total = 0;
    let cart = 0; // cart 변수 초기화

    // 세션 스토리지에서 가져온 값이 없으면 total과 cart를 0으로 반환
    if (!val) return { total, cart };

    const obj = JSON.parse(val); // 세션에서 가져온 값을 객체로 변환

    // 아이템 가격 리스트
    const items = [
        { name: "싱글레귤러", price: 3200 },
        { name: "싱글킹", price: 4000 },
        { name: "더블주니어", price: 4300 },
        { name: "더블레귤러", price: 6200 },
        { name: "파인트", price: 8200 },
        { name: "쿼터", price: 15500 },
        { name: "패밀리", price: 22000 },
        { name: "하프갤런", price: 26500 }
    ];

    // 주문 내역에서 아이템 가격 계산
    Object.values(obj).forEach(entry => {
        const item = items.find(i => i.name === entry.size);
        const count = entry.count || 1;
        if (item) {
            console.log("아이템 발견:", item); // 아이템 확인
            total += item.price * count;
            cart += count;
        } else {
            console.warn("아이템을 찾을 수 없습니다:", entry.size);
        }
    });

    return { total, cart };
}
