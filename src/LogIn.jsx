import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function LogIn() {
  const navigate = useNavigate(); // useNavigate 훅을 통해 페이지 이동 선언
  const [formData, setFormData] = useState({
    user_id: '',
    user_pw: '',
  });

  const isFormValid = formData.user_id && formData.user_pw; // 아이디와 비밀번호가 모두 입력되었는지 확인

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 로그인 요청을 서버로 전송
      const response = await fetch('http://localhost:8081/login', { // 실제 API URL로 변경
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: formData.user_id,
          password: formData.user_pw,
        }),
      });

      if (response.ok) {
        // 로그인 성공 시
        const data = await response.json();
        // 예를 들어, 토큰이 있다면 로컬 스토리지에 저장
        localStorage.setItem('token', data.token);
        alert('로그인이 완료되었습니다!');
        navigate('/Home'); // 로그인 후 홈 페이지로 이동
      } else {
        // 서버에서 실패 응답을 받은 경우
        const errorData = await response.json();
        console.error('서버에서 받은 오류:', errorData); // 에러를 콘솔에 출력
        alert(`로그인에 실패하였습니다: ${errorData.message}`);
      }
    } catch (error) {
      // 네트워크 에러 등의 이유로 실패한 경우
      console.error('네트워크 오류 또는 서버와의 연결 문제:', error); // 오류 상세 로그 출력
      alert('로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='log-in-box'>
        <p>아이디: </p>
        <input
          type="text"
          name="user_id"
          value={formData.user_id}
          onChange={handleChange}
        />
      </div>
      <div className='log-in-box'>
        <p>비밀번호: </p>
        <input
          type="password"
          name="user_pw"
          value={formData.user_pw}
          onChange={handleChange}
        />
      </div>
      <button
        className='log-in-btn cusor'
        type="submit"
        disabled={!isFormValid} // 아이디와 비밀번호가 모두 입력되지 않으면 버튼 비활성화
      >
        로그인
      </button>
      <div><p>아직 회원이 아니신가요?</p></div>
      <div className='sign-up-btn'>
        <p className='cusor'>
          <Link to='/Sign_Up'>
            회원가입 하러가기
          </Link>
        </p>
      </div>
    </form>
  );
}

export default LogIn;
