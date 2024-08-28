import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);
  const [loadingFile, setLoadingFile] = useState(false);
  const [loadingUrl, setLoadingUrl] = useState(false);

  // 파일 변경 핸들러
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const videoMimeTypes = ['video/mp4', 'video/webm', 'video/ogg'];
      if (videoMimeTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
      } else {
        alert('동영상 파일만 업로드할 수 있습니다.');
        setFile(null);
      }
    }
  };

  // 파일 제출 핸들러
  const handleFileSubmit = async () => {
    if (!file) {
      alert('파일을 첨부해주세요.');
      return;
    }

    setLoadingFile(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8081/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('파일이 성공적으로 제출되었습니다.');
        navigate('/Subtitle');
      } else {
        const errorData = await response.json();
        alert(`파일 제출에 실패하였습니다: ${errorData.message || '오류가 발생했습니다.'}`);
      }
    } catch (error) {
      console.error('Error submitting file:', error);
      alert('파일 제출 중 오류가 발생하였습니다.');
    } finally {
      setLoadingFile(false);
    }
  };

  // URL 제출 핸들러
  const handleUrlSubmit = async () => {
    const urlPattern = /^https?:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]{11}$/;
    if (!urlPattern.test(url)) {
      alert('유효한 유튜브 URL을 입력해주세요.');
      return;
    }

    setLoadingUrl(true);
    try {
      const response = await fetch('http://localhost:8081/upload-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (response.ok) {
        alert('URL이 성공적으로 제출되었습니다.');
        navigate('/Subtitle');
      } else {
        const errorData = await response.json();
        alert(`URL 제출에 실패하였습니다: ${errorData.message || '오류가 발생했습니다.'}`);
      }
    } catch (error) {
      console.error('Error submitting URL:', error);
      alert('URL 제출 중 오류가 발생하였습니다.');
    } finally {
      setLoadingUrl(false);
    }
  };

  return (
    <div className="mini-box-body-color">
      <p className="text-1">파일을 첨부하거나, 유튜브 URL을 올리세요.</p>

      <div className="mini-box-body">
        <div className="mini-box mb">
          <div>
            <p>파일을 첨부해주세요</p>
            <input id="file" type="file" accept="video/*" onChange={handleFileChange} />
          </div>
          <button
            className="url-btn"
            onClick={handleFileSubmit}
            disabled={!file || loadingFile || loadingUrl}
          >
            {loadingFile ? '제출 중...' : '제출하기'}
          </button>
        </div>

        <div className="mini-box">
          <div className="fg">
            <p>유튜브 URL을 입력해주세요.</p>
            <div className="url-box">
              <input
                className="youtube-url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="URL을 입력하세요"
                disabled={loadingFile}
              />
            </div>
          </div>
          <button className="url-btn" onClick={handleUrlSubmit} disabled={loadingUrl || loadingFile}>
            {loadingUrl ? '제출 중...' : '제출하기'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
