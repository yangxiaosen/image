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
                   after: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493287035729&di=0f17e0ebf81026d64ea8294408dc0ea4&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fd53f8794a4c27d1ee59e974819d5ad6edcc43885.jpg",
                   id:"111",
                   shipin1:"0:0",
                   shipin2:"0:0",
                   shipin3:"0:0",
                   text:"0:0",
                   shipin4:"0:0",
                   shipin5:"0:0",
                   shipin6:"0:0"};
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
    this.submitimg();
    var imageinput=this.refs.imageinput;
    var image=imageinput.files[0];
    var oFReader = new FileReader();
    oFReader.readAsDataURL(image);
    oFReader.onload=function(e){
      self.setState({background:e.target.result,
        after:e.target.result});
    }
  }

  drop(e){
    e.preventDefault();
    var data=e.dataTransfer.getData("Text");
    var target=e.dataTransfer.getData("Target");
    console.log(target);
    console.log(data);
    //获取图片位置
    var imaget=e.target.getBoundingClientRect().top;
    var imagel=e.target.getBoundingClientRect().left;
    console.log(e.target.getBoundingClientRect().top);
    console.log(e.target.getBoundingClientRect().left);
    //获取鼠标位置
    var clientt=e.clientY-20;
    var clientl=e.clientX-50;
    //计算相对位置
    console.log(e.clientX-imagel);
    console.log(e.clientY-imaget);
    var x=(e.clientX-imagel)/480;
    var y=(e.clientY-imaget)/350;
    //拼接成字符串
    var position=x+':'+y;

    var dataid;
    if(/copy/g.test(data)){
      dataid=data;
    }else{
      dataid=data+"copy";
    }
    var tt=document.getElementById(dataid);
    console.log(tt);
    tt.style.top=clientt+"px";
    tt.style.left=clientl+"px";
    this.setState({target:});
  }

  allowDrop(e){
    e.preventDefault();
  }

  //提交图片
  submitimg(){
    //获取图片文件
    var imageinput=this.refs.imageinput;
    var image=imageinput.files[0];
    var formData = new FormData();
    formData.append('image',image);
    //提交数据
    var url;
    var obj=new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
    obj.open('POST',url,true);
    obj.onreadystatechange=function(){
        if (obj.readyState == 4 && obj.status == 200) { // readyState==4说明请求已完成
            //fn.call(this, obj.responseText)从服务器获得数据
        }
    };
    obj.send(formData);
  }
  //提交操作
  submitshow(action,x,y){
    var obj=new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
      var url;
      x=x/480;
      y=y/350;
      url=url+'?'+action+'="'+x+':'+y+'"';
      obj.open('GET',url,true);
      obj.onreadystatechange=function(){
          if (obj.readyState == 4 && obj.status == 200) { // readyState==4说明请求已完成
              //fn.call(this, obj.responseText)从服务器获得数据
              //this.setState({sign:sign.getTime()+''});
          }
      };
      obj.send();
  }

  //与子组件交互，获取子组件修改后图片链接
  setAfter(url){
    this.setState({after:url});
  }
  //与子组件交互，获取文字水印信息
  setText(msg){
    this.setState({text:msg});
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
           <div className="img-after" id="imgafter" onDrop={this.drop} onDragOver={this.allowDrop}><img src={this.state.after} className="image-content" id="imagehandle" /></div>
           <button className="btn-before" onClick={this.handleClick.bind(this)}>上传图片</button>
           <a href={this.state.after} download="已处理">
           <button className="btn-after">保存图片</button>
           </a>
        </div>
        <button className="btn-one">一键处理</button>
        <Btn sign={this.state.sign} setafter={this.setAfter} settext={this.setText}/>
      </div>
    );
  }
}

export default App;
