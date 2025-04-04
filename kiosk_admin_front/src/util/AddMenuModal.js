import React, { useState, useEffect, useRef } from 'react';
import '../css/AddMenuModal.css';

const AddMenuModal = ({ onClose, onComplete }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [imgFile, setImgFile] = useState(null);
  const modalRef = useRef();
  const REST = process.env.REACT_APP_REST;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('code', code);
    formData.append('img', imgFile);

    try {
      const res = await fetch(`${REST}/admin/addmenu`, {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        alert('등록 완료!');
        onClose();
        if (onComplete) onComplete(); // ✅ 등록 후 부모에서 리스트 갱신
      } else {
        alert('등록 실패');
      }
    } catch (err) {
      console.error('에러:', err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" ref={modalRef}>
        <h2>메뉴 추가</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="메뉴명"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="메뉴코드"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImgFile(e.target.files[0])}
            required
          />
          <div className="modal-buttons">
            <button type="submit">등록하기</button>
            <button type="button" onClick={onClose}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMenuModal;
