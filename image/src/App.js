import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>图像处理demo</h2>
        </div>
        <p className="App-intro">
          通过这里的图片处理，你可以美化你的图片.
        </p>
        <div className="img-content">
           <div className="img-before"></div>
           <div className="img-after"></div>
           <button className="btn-before">处理前</button>
           <button className="btn-after">处理后</button>
        </div>
        <button className="btn-one">一键处理</button>
        <div className="btn-choose">
            <div>美白</div>
            <div>滤镜</div>
            <div>水印</div>
            <div>镜像</div>
            <div>裁剪</div>
            <div>拼接</div>
            <div>旋转</div>
        </div>
      </div>
    );
  }
}

export default App;
