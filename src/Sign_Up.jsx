// 필요한 훅들을 import
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sign_Up() {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅 사용
  const [formData, setFormData] = useState({
    userName: '',
    user_id: '',
    user_pw: '',
    confirm_pw: '', // 비밀번호 확인 필드 추가
    email: '', // 이메일 추가
    phone: '', // 전화번호 추가
  });

  // 모든 필드가 채워지고, 비밀번호와 확인 비밀번호가 일치하는지 확인
  const isFormValid =
    formData.userName &&
    formData.user_id &&
    formData.user_pw &&
    formData.confirm_pw &&
    formData.email &&
    formData.phone &&
    formData.user_pw === formData.confirm_pw;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 회원가입 요청을 서버로 전송
    try {
      const response = await fetch('http://localhost:8081/Sign_Up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: formData.userName,
          user_id: formData.user_id,
          user_pw: formData.user_pw,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      if (response.ok) {
        // 회원가입 성공 시
        alert('회원가입이 완료되었습니다!');
        navigate('/LogIn'); // 회원가입 후 로그인 페이지로 이동
      } else if (response.status === 409) {
        // 이미 존재하는 아이디 경고
        alert('이미 존재하는 아이디입니다. 다른 아이디를 사용해주세요.');
      } else {
        // 서버에서 실패 응답을 받은 경우
        const errorData = await response.json();
        console.error('서버에서 받은 오류:', errorData); // 서버에서 받은 오류를 콘솔에 출력
        alert(`회원가입에 실패하였습니다: ${errorData.message}`);
      }
    } catch (error) {
      // 네트워크 에러 등의 이유로 실패한 경우
      console.error('네트워크 오류 또는 서버와의 연결 문제:', error); // 자세한 오류를 콘솔에 출력
      alert('회원가입 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <>
      <p>회원가입을 위한 정보를 입력해주세요!</p>
      <form onSubmit={handleSubmit}>
        <div className="log-in-box">
          <p>이름: </p>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div className="log-in-box">
          <p>아이디: </p>
          <input
            type="text"
            name="user_id"
            value={formData.user_id}
            onChange={handleChange}
          />
        </div>
        <div className="log-in-box">
          <p>비밀번호: </p>
          <input
            type="password"
            name="user_pw"
            value={formData.user_pw}
            onChange={handleChange}
          />
        </div>
        <div className="log-in-box">
          <p>비밀번호 확인: </p>
          <input
            type="password"
            name="confirm_pw"
            value={formData.confirm_pw}
            onChange={handleChange}
          />
        </div>
        <div className="log-in-box">
          <p>이메일: </p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="log-in-box">
          <p>전화번호: </p>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <button
          className="log-in-btn cusor"
          type="submit"
          disabled={!isFormValid} // 모든 필드가 채워지지 않으면 버튼 비활성화
        >
          회원가입
        </button>
      </form>
    </>
  );
}

export default Sign_Up;
