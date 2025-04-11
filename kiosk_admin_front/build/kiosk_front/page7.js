window.onload = () => {
    // 세션 스토리지에서 저장된 값 가져오기
    const finalAmount = sessionStorage.getItem("finalAmount");
    const finalAmountOrder = sessionStorage.getItem("finalAmountOrder");

    // HTML에서 최종 금액을 표시할 요소 선택
    const finalAmountElement = document.querySelector("#finalAmount1");
    if (finalAmountElement && finalAmount) {
        finalAmountElement.textContent = `₩ ${parseInt(finalAmount).toLocaleString()}`;
    }

    const finalAmountOrderElement = document.querySelector("#finalAmount2");
    if (finalAmountOrderElement && finalAmountOrder) {
        finalAmountOrderElement.textContent = `₩ ${parseInt(finalAmountOrder).toLocaleString()}`;
    }
};
