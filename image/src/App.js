import React, { Component } from 'react';
import $ from 'jquery';
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
                   id:"1",
                   shipin1:"0:0",
                   shipin2:"0:0",
                   shipin3:"0:0",
                   text:"0:0",
                   shipin4:"0:0",
                   shipin5:"0:0",
                   shipin6:"0:0",
                   textcontent:"by yang"};
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
    };
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
    //条件判断
    switch(target){
      case 'shipin1':
      this.setState({shipin1:position});
      break;
      case 'shipin2':
      this.setState({shipin2:position});
      break;
      case 'shipin3':
      this.setState({shipin3:position});
      break;
      case 'text':
      this.setState({text:position});
      break;
      case 'shipin4':
      this.setState({shipin4:position});
      break;
      case 'shipin5':
      this.setState({shipin5:position});
      break;
      case 'shipin6':
      this.setState({shipin6:position});
      break;
      default:
    }
    //this.setState({target:position});
    this.freshIcon()
  }

  allowDrop(e){
    e.preventDefault();
  }

  //提交图片
  submitimg(){
    //获取图片文件
    var self=this;
    var imageinput=this.refs.imageinput;
    var image=imageinput.files[0];
    var formData = new FormData();
    formData.append('image',image);
    //提交数据
    var url='http://119.29.34.218:8080/VHDL/FileAction/upload';
    var obj=new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
    obj.open('POST',url,true);
    obj.withCredentials = true;
    obj.crossDomain = true;
    obj.onreadystatechange=function(){
        if (obj.readyState == 4 && obj.status == 200) { // readyState==4说明请求已完成
            //fn.call(this, obj.responseText)从服务器获得数据
            console.log(obj.responseText);
            var img=JSON.parse(obj.responseText).url;
            var id=JSON.parse(obj.responseText).id;
            console.log(img);
            console.log(id);
            self.setState({after:img,
                           id:id});
        }
    };
    obj.send(formData);
    /*$.ajax({
        url: url,
        type: 'POST',
        dataType: 'JSONP',//here
        data:formData,
        success: function (data) {
          console.log(data);
        }
      });*/

  }
  //提交操作
  /*submitshow(action,x,y){
    var obj=new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
      var url;
      x=x/480;
      y=y/350;
      url=url+'?'+action+'="'+x+':'+y+'"';
      obj.open('GET',url,true);
      obj.onreadystatechange=function(){
          if (obj.readyState == 4 && obj.status == 200) { // readyState==4说明请求已完成
              //this.freshPosition();
          }
      };
      obj.send();
  }*/

  //与子组件交互，获取子组件修改后图片链接
  setAfter(url){
    this.setState({after:url});
  }
  //与子组件交互，获取文字水印信息
  setText(msg){
    this.setState({textcontent:msg});
    //console.log(msg);
  }
  //刷新图标位置
  freshPosition(){
    var icon=document.getElementsByClassName("btn-listcopy")[0].getElementsByTagName("div");
    for(var i=0;i<icon.length;i++){
      var dom=icon[i];
      dom.style.top=-100+'px';
      dom.style.left=-100+'px';
    }
  }
  //刷新操作按钮位置
  freshIcon(){
    //获取图标dom
    var btns=document.getElementsByClassName("btn-list");
    for(var i=0;i<btns.length;i++){
      btns[i].style.visibility="hidden";
    }
  }

  //一键提交水印图标
  subData(){
    var self=this;
    var icon=document.getElementsByClassName("btn-listcopy")[0].getElementsByTagName("div");
    //判断多少个水印图标在图片上
    var action='';
    for(var i=0;i<icon.length;i++){
      //console.log(icon[i].offsetTop);
      //console.log(icon[i].getAttribute("data-target"));
      var target=icon[i].getAttribute("data-target");
      if(icon[i].offsetTop>0){
          if(target=='text'){
            action=action+target+'='+this.state[target+'']+':'+this.state.textcontent+',';
          }else{
            action=action+target+'='+this.state[target+'']+',';
          }
      }
    }
    
    console.log(action);
    if(action!=''){
      //console.log(action);
      
      var url='http://119.29.34.218:8080/VHDL/FileAction/operation';
      url=url+'?id='+this.state.id+'&operation='+action;
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'JSONP',//here
        success: function (data) {
          console.log(data);
          self.freshPosition();
          if(data.url){
            self.setState({after:data.url});
            self.freshPosition();
          }else{
            alert("处理失败");
          }
        }
      });
      /*$.get(url,function(data){
        console.log(data);
      });*/
      /*$.getJSON(url,function(data){
        console.log(data);
      });*/
      /*var obj=new XMLHttpRequest();
      obj.open('GET',url,true);
      obj.onreadystatechange=function(){
          if (obj.readyState == 4 && obj.status == 200) { // readyState==4说明请求已完成
              //this.freshPosition();
              console.log(obj.responseText);
          }
      }
      obj.send();*/
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
           <div className="img-after" id="imgafter" onDrop={this.drop.bind(this)} onDragOver={this.allowDrop.bind(this)}><img src={this.state.after} className="image-content" id="imagehandle" /></div>
           <button className="btn-before" onClick={this.handleClick.bind(this)}>上传图片</button>
           <a href={this.state.after} download="已处理">
           <button className="btn-after">保存图片</button>
           </a>
        </div>
        <button className="btn-one" onClick={this.subData.bind(this)}>一键处理</button>
        <Btn sign={this.state.id} setafter={this.setAfter.bind(this)} settext={this.setText.bind(this)}/>
      </div>
    );
  }
}

export default App;
