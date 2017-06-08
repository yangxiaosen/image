import React, { Component } from 'react';
import './Btn.css';
import $ from 'jquery';
import fx from 'glfx';
class Btn extends Component {
	constructor(props) {
    super(props);
    //var id=this.props.sign;
    this.state = { id:1,
                   action:'none'};
  }

	handleClick(event){
		    try {
		        var canvas = fx.canvas();
		    } catch (e) {
		        alert(e);
		        return;
		    }
		    var num=event.target.getAttribute("data-target");
		    var image = document.getElementById('imagehandle');
		    image.src=this.props.yang;
            var texture = canvas.texture(image);
            switch(num){
            	case '1':
            	//油画效果
                canvas.draw(texture).ink(0.50).update();
                break;
                case '2':
                //朦胧
                canvas.draw(texture).lensBlur(10, 0.75, 0).update();
                break;
                case '3':
                //回忆
                canvas.draw(texture).sepia(1).update();
                break;
                case '4':
                //锐化
                canvas.draw(texture).unsharpMask(20, 2).update();
                break;
                case '5':
                //边缘模糊
                canvas.draw(texture).tiltShift(50, 300, 350, 50, 15, 200).update();
                break;
                case '6':
                //视觉冲击
                canvas.draw(texture).zoomBlur(327, 250.5, 0.3).update();
                break;
                case '7':
                //颗粒感
                canvas.draw(texture).colorHalftone(320, 239.5, 0.25, 4).update();
                break;
                case '8':
                //抽象画
                canvas.draw(texture).edgeWork(10).update();
                break;
                case '9':
                //鱼眼
                canvas.draw(texture).bulgePinch(200, 200, 200, 0.5).update();
                break;
                case '10':
                //空间扭曲
                canvas.draw(texture).swirl(200, 180, 200, 3).update();
                break;
                default:
                alert("错啦");
            }
            //油画效果
            //canvas.draw(texture).ink(0.50).update();
            //朦胧
            //canvas.draw(texture).lensBlur(10, 0.75, 0).update();
            //回忆
            //canvas.draw(texture).sepia(1).update();
            //锐化
            //canvas.draw(texture).unsharpMask(20, 2).update();
            //边缘模糊
            //canvas.draw(texture).tiltShift(96, 359.25, 328, 271.390625, 15, 200).update();
            //视觉冲击
            //canvas.draw(texture).zoomBlur(327, 250.5, 0.3).update();
            //粗糙效果
            //canvas.draw(texture).colorHalftone(320, 239.5, 0.25, 4).update();
            //抽象画
            //canvas.draw(texture).edgeWork(10).update();
            //鱼眼
            //canvas.draw(texture).bulgePinch(334, 249.5, 200, 0.5).update();
            //空间扭曲
            //canvas.draw(texture).swirl(323, 240.5, 200, 3).update();

            /*image.parentNode.insertBefore(canvas, image);
            image.parentNode.removeChild(image);*/
            image.src=canvas.toDataURL();
            this.freshIcon();
	}

	btnClick1(e){
		//
		var listdom=e.target;
		var targetdom=listdom.getAttribute("data-target");
		//listdom.style.visibility='hidden';
		var status=document.getElementById(targetdom);
		//.style.visibility;
		if(status.style.visibility=="hidden"){
			status.style.visibility="visible";
		}else{
			status.style.visibility="hidden";
		}
	}

	drag(e){
		e.dataTransfer.setData("Text",e.target.id);
		e.dataTransfer.setData("Target",e.target.getAttribute("data-target"));
		console.log(e.target);
	}

	//点击提交数据
	clicksubmit(e){
		//获取操作名称
		var action=e.target.getAttribute("data-target");
		action=action+'='+action+',';
		var id=this.props.sign;
		this.submitshow1(id,action);
		this.freshIcon();
	}

	
	//提交操作,不需要坐标参数
	submitshow1(id,action){
		var self=this;
		//var obj=new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
	    var url='http://119.29.34.218:8080/VHDL/FileAction/operation';
	    url=url+'?id='+id+'&operation='+action;
	    /*obj.open('GET',url,true);
	    obj.onreadystatechange=function(){
	        if (obj.readyState == 4 && obj.status == 200) {
	        	var imageurl=obj.responseText;
	        	this.props.setafter(imageurl);
	        // readyState==4说明请求已完成
	        //fn.call(this, obj.responseText)从服务器获得数据
	        //this.setState({sign:sign.getTime()+''});
	        }
	    };
	    obj.send();*/
	    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'JSONP',//here
        success: function (data) {
          console.log(data);
          if(data.url){
          	//self.setState({after:data.url});
          	self.props.setafter(data.url);
          	console.log(data.url);
          	var image = document.getElementById('imagehandle');
            image.src=data.url+'?random='+Math.random();
            console.log(image.src);
          }else{
          	alert("处理失败");
          }
        }
        });
	}

	//刷新图标位置
	freshIcon(){
		//获取图标dom
		var btns=document.getElementsByClassName("btn-list");
		for(var i=0;i<btns.length;i++){
			btns[i].style.visibility="hidden";
		}
	}
	//监听文字改变
	handleChange(e){
		this.props.settext(e.target.value);
	}

	render(){
		return(
			<div>
			<div className="btn-choose">
				{/*<div onClick={this.handleClick.bind(this)}>油画</div>*/}
	            <div data-target="btn-list1" onClick={this.btnClick1.bind(this)}>基础编辑</div>
	            <div data-target="btn-list2" onClick={this.btnClick1.bind(this)}>饰品</div>
	            <div data-target="btn-list3" onClick={this.btnClick1.bind(this)}>边框</div>
	            <div data-target="btn-list4" onClick={this.btnClick1.bind(this)}>场景</div>
            </div>
            <div id="btn-list1" className="btn-list" ref="basicevent">
            	<div className="glfxshow" data-target="1" onClick={this.handleClick.bind(this)}>油画效果</div>
	            <div className="glfxshow" data-target="2" onClick={this.handleClick.bind(this)}>朦胧</div>
	            <div className="glfxshow" data-target="3" onClick={this.handleClick.bind(this)}>回忆</div>
	            <div className="glfxshow" data-target="4" onClick={this.handleClick.bind(this)}>锐化</div>
	            <div className="glfxshow" data-target="5" onClick={this.handleClick.bind(this)}>边缘模糊</div>
	            <div className="glfxshow" data-target="6" onClick={this.handleClick.bind(this)}>视觉冲击</div>
	            <div className="glfxshow" data-target="7" onClick={this.handleClick.bind(this)}>颗粒感</div>
	            <div className="glfxshow" data-target="8" onClick={this.handleClick.bind(this)}>抽象画</div>
	            <div className="glfxshow" data-target="9" onClick={this.handleClick.bind(this)}>鱼眼</div>
	            <div className="glfxshow" data-target="10" onClick={this.handleClick.bind(this)}>空间扭曲</div>
            </div>
            <div id="btn-list2" className="btn-list">
            	<div className="watermark1" id="watermark1" data-target="shipin1" draggable="true" onDragStart={this.drag}></div>
	            <div className="watermark2" id="watermark2" data-target="shipin2" draggable="true" onDragStart={this.drag}></div>
	            <div className="watermark3" id="watermark3" data-target="shipin3" draggable="true" onDragStart={this.drag}></div>
	            {/*<div id="text" data-target="text" draggable="true" onDragStart={this.drag}><input type="text" placeholder="文字"/></div>*/}
	            <div className="watermark4" id="watermark4" data-target="shipin4" draggable="true" onDragStart={this.drag}></div>
	            <div className="watermark5" id="watermark5" data-target="shipin5" draggable="true" onDragStart={this.drag}></div>
	            {/*<div className="watermark6" id="watermark6" data-target="shipin6" draggable="true" onDragStart={this.drag}></div>*/}
            </div>
            <div className="btn-listcopy">
            	<div className="watermark1" id="watermark1copy" data-target="shipin1" draggable="true" onDragStart={this.drag}></div>
	            <div className="watermark2" id="watermark2copy" data-target="shipin2" draggable="true" onDragStart={this.drag}></div>
	            <div className="watermark3" id="watermark3copy" data-target="shipin3" draggable="true" onDragStart={this.drag}></div>
	            {/*<div id="textcopy" data-target="text" draggable="true" onDragStart={this.drag}><input type="text" onChange={this.handleChange.bind(this)} placeholder="文字"/></div>*/}
	            <div className="watermark4" id="watermark4copy" data-target="shipin4" draggable="true" onDragStart={this.drag}></div>
	            <div className="watermark5" id="watermark5copy" data-target="shipin5" draggable="true" onDragStart={this.drag}></div>
	            {/*<div className="watermark6" id="watermark6copy" data-target="shipin6" draggable="true" onDragStart={this.drag}></div>*/}
            </div>
            <div id="btn-list3" className="btn-list">
            	<div className="border1" data-target="border1" onClick={this.clicksubmit.bind(this)}>边框1</div>
	            <div className="border2" data-target="border2" onClick={this.clicksubmit.bind(this)}>边框2</div>
	            <div className="border3" data-target="border3" onClick={this.clicksubmit.bind(this)}>边框3</div>
            </div>
            <div id="btn-list4" className="btn-list">
            	<div className="border4" data-target="show1" onClick={this.clicksubmit.bind(this)}></div>
	            <div className="border5" data-target="show2" onClick={this.clicksubmit.bind(this)}></div>
	            {/*<div className="border6" data-target="show3" onClick={this.clicksubmit.bind(this)}></div>*/}
            </div>
            </div>
			);
	}
}

export default Btn;