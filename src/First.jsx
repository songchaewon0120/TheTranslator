// import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function First() {

  return (
    <>
      <p>어서오세요! 번역을 하고싶으신가요?</p>
      <p>로그인 후 이용하세요!</p>
      <div id='bottom'>
        <div className='log-in'>
          <p className='cusor'>
            <Link to="/login">
              로그인 하기
            </Link>
          </p>
          <p className='cusor'>
            <Link to='/Sign_Up'>
              회원가입 하기
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default First;
