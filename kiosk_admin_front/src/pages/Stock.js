import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Stock = () => {
    const [stockList, setStockList] = useState([]);
    const REST = process.env.REACT_APP_REST;

    useEffect(() => {
        axios.get(`${REST}/api/getStockList`)
            .then(response => {
                setStockList(response.data);
            })
            .catch(error => {
                console.error('재고 목록을 불러오는 데 실패했습니다:', error);
            });
    }, []);

    return (
        <div>
            <h1>재고 관리 페이지</h1>
            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>지점</th>
                        <th>맛</th>
                        <th>재고량</th>
                        <th>판매중</th>
                        <th>주문에 사용중</th>
                    </tr>
                </thead>
                <tbody>
                    {stockList.map((item, index) => (
                        <tr key={index}>
                            <td>{item.place_name}</td>
                            <td>{item.flavor_name}</td>
                            <td>{item.amount}</td>
                            <td>{item.selling ? 'O' : 'X'}</td>
                            <td>{item.inOrder ? 'O' : 'X'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Stock;

