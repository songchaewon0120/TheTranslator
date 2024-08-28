import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Subtitle() {
  const navigate = useNavigate();

  useEffect(() => {
    const translatedData = true; // 여기에 번역된 데이터가 있는지 확인하는 로직 추가
    if (!translatedData) {
      navigate('/');
    }
  }, [navigate]);

  const handleDownload = () => {
    // 여기에 실제 번역된 데이터를 넣어야 함
    const translatedData = ['실제 번역된 데이터', '가 들어가야 함'];

    // CSV 파일 생성 로직
    const headers = ['Translated Text']; // CSV의 헤더
    const csvRows = [
      headers.join(','), // 헤더 추가
      ...translatedData.map(item => `"${item}"`) // 각 데이터 행을 CSV 형식으로 변환
    ];

    const csvContent = csvRows.join('\n'); // CSV 파일 내용
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'translated_data.csv'); // 다운로드 파일 이름 설정
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // 링크 제거
  };

  const handleSubmit = (e) => {

    navigate('/Home');
  };

  return (
    <>
      <p className='text-1'>번역이 완성되었습니다.</p>
      <p className='down-text'>텍스트 파일로 다운로드 받으세요!</p>
      <button onClick={handleDownload} className='log-in-btn cusor down-btn'>
        파일 다운로드 받기
      </button>
      <button onClick={handleSubmit} className='log-in-btn cusor down-btn down-btn2'>다른 파일 번역하러 가기</button>
    </>
  );
}

export default Subtitle;
