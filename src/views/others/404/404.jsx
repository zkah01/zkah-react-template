import React from 'react';
import img404 from '@/assets/404_images/404.png';
import img404cloud from '@/assets/404_images/404_cloud.png';
import './error.scss';

const View404 = () => (
  <div class='wscn-http404-container'>
    <div className='wscn-http404'>
      <div className='pic-404'>
        <img className='pic-404__parent' src={img404} alt='404' />
        <img className='pic-404__child left' src={img404cloud} alt='404' />
        <img className='pic-404__child mid' src={img404cloud} alt='404' />
        <img className='pic-404__child right' src={img404cloud} alt='404' />
      </div>
      <div class='bullshit'>
        <div className='bullshit__oops'>404错误!</div>
        <div className='bullshit__headline'>找不到网页！</div>
        <div className='bullshit__info'>
          对不起，您正在寻找的页面不存在。尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。
        </div>
        {/* <router-link to='/' className='bullshit__return-home'>
          返回首页
        </router-link> */}
      </div>
    </div>
  </div>
);

export default View404;
