import './App.css';
import './ban.css';
import './animation.css';
import { Outlet } from 'react-router-dom';
import AnimatedTitle from './AnimatedTitle';

function Layout() {
  return (
    <>
      <div className='animated-background'>
        {/* 뒤에 돌아다니는 배경 */}
        <AnimatedTitle className="animated-title" trackClassName="track" />
        <AnimatedTitle className="animated-title-2" trackClassName="track-2" />
        <AnimatedTitle className="animated-title-3" trackClassName="track-3" />
        <AnimatedTitle className="animated-title-4" trackClassName="track-4" />
        <AnimatedTitle className="animated-title" trackClassName="track" />
        <AnimatedTitle className="animated-title-2" trackClassName="track-2" />
        <AnimatedTitle className="animated-title-3" trackClassName="track-3" />
        <AnimatedTitle className="animated-title-4" trackClassName="track-4" />
      </div>
      <div className='body'>
        <div className='box mini-box-body-color'>
          <div id='top'>
            <div className='the-translator'>
              The Translator
            </div>
          </div>
          <div id='middle'>
            {/* 여기 부분만 바뀜 */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Layout;
