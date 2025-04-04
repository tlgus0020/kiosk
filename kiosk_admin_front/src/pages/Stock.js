import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Pay.css';


const Stock = () => {
    const [stockList, setStockTotalList] = useState([]);
    const REST = process.env.REACT_APP_REST;

    useEffect(() => {
        axios.get(`${REST}/api/stocktotalList`)
            .then(response => {
                setStockTotalList(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('재고 목록을 불러오는 데 실패했습니다:', error);
            });
    }, []);

    return (
        <div className="pay-container">
            <div className="pay-table">
                <table>
                    <thead>
                        <tr>
                            <th>NO</th>
                            <th>지점</th>
                            <th>메뉴명</th>
                            <th>이미지파일주소</th>
                            <th>재고량</th>
                            <th>상품상태</th>
                            <th>발주상태</th>
                            <th>발주하기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stockList.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.place_name}</td>
                                <td>{item.menu_name}</td>
                                <td>{item.img_path}</td>
                                <td>{item.stock_qty}</td>
                                <td>{item.product_state ? '판매중' : '판매중단'}</td>
                                <td>{item.order_state}</td>
                                <td>
                                    <button>
                                        <img src="/Icon.png" alt="발주"/>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Stock;

