import React, { Component } from 'react';
import logo from './logo.svg';
import Btn from './Btn';
import './App.css';

class App extends Component {
 /* getInitialState(){
    return {
      background:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493287035729&di=0f17e0ebf81026d64ea8294408dc0ea4&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd53f8794a4c27d1ee59e974819d5ad6edcc43885.jpg"
    };
  }*/
  constructor(props) {
    super(props);
    this.state = { background: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493287035729&di=0f17e0ebf81026d64ea8294408dc0ea4&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd53f8794a4c27d1ee59e974819d5ad6edcc43885.jpg",
                   after: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493287035729&di=0f17e0ebf81026d64ea8294408dc0ea4&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd53f8794a4c27d1ee59e974819d5ad6edcc43885.jpg"};
  }

  handleClick(){
    //
    var self=this;
    var imageinput=this.refs.imageinput;
    imageinput.click();
  }

  handleChange(){
    //this.setState({background:"http://img2.imgtn.bdimg.com/it/u=48219243,819110730&fm=214&gp=0.jpg"});
    var self=this;
    var imageinput=this.refs.imageinput;
    var image=imageinput.files[0];
    var oFReader = new FileReader();
    oFReader.readAsDataURL(image);
    oFReader.onload=function(e){
      self.setState({background:e.target.result,
        after:e.target.result});
    }
  }

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
           <div className="img-before">
             <input type="file" ref="imageinput" id="imageinput" onChange={this.handleChange.bind(this)}/>
             <img src={this.state.background} className="image-content" />
           </div>
           <div className="img-after"><img src={this.state.after} className="image-content" id="imagehandle" /></div>
           <button className="btn-before" onClick={this.handleClick.bind(this)}>上传图片</button>
           <a href={this.state.after} download="已处理">
           <button className="btn-after">保存图片</button>
           </a>
        </div>
        <button className="btn-one">一键处理</button>
        <Btn/>
      </div>
    );
  }
}

export default App;
