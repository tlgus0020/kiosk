import React from 'react';
import '../css/OrderModal.css';

const OrderModal = ({ item, onClose, onConfirm, onQtyChange }) => {
  if (!item) return null;

  return (
    <>
      <div className="overlay" onClick={onClose}></div>
      <div className="modal">
        <img src={item.img_path} alt={item.menu_name} className="modal-image" />
        <h2>{item.menu_name}</h2>

        <div className="quantity">
          <button onClick={() => onQtyChange(Math.max(item.stock_qty - 1, 1))}>-</button>
          <span>{item.stock_qty}</span>
          <button onClick={() => onQtyChange(item.stock_qty + 1)}>+</button>
        </div>

        <div className="modal-buttons">
          <button className="cancel-btn" onClick={onClose}>취소</button>
          <button className="confirm-btn" onClick={onConfirm}>발주하기</button>
        </div>
      </div>
      
    </>
  );
};

export default OrderModal;
