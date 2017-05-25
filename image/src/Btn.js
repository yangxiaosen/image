import React, { Component } from 'react';
import './Btn.css';
import fx from 'glfx';
class Btn extends Component {
	handleClick(){
		    try {
		        var canvas = fx.canvas();
		    } catch (e) {
		        alert(e);
		        return;
		    }
		    var image = document.getElementById('imagehandle');
            var texture = canvas.texture(image);
            canvas.draw(texture).ink(0.50).update();
            //console.log(canvas);
            //console.log(canvas.toDataURL());
            /*image.parentNode.insertBefore(canvas, image);
            image.parentNode.removeChild(image);*/
            image.src=canvas.toDataURL();
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

	
	//提交操作,不需要坐标参数
	submitshow1(action){
		var obj=new XMLHttpRequest();  // XMLHttpRequest对象用于在后台与服务器交换数据          
	    var url;
	    url=url+'?'+action+'='+action;
	    obj.open('GET',url,true);
	    obj.onreadystatechange=function(){
	        if (obj.readyState == 4 && obj.status == 200) { // readyState==4说明请求已完成
	            //fn.call(this, obj.responseText)从服务器获得数据
	            //this.setState({sign:sign.getTime()+''});
	        }
	    };
	    obj.send();
	}

	//刷新图标位置
	freshicon(){
		//获取图标dom
		document.getElementByClassName("btn-listcopy");
	}

	render(){
		return(
			<div>
			<div className="btn-choose">
				<div onClick={this.handleClick.bind(this)}>油画</div>
	            <div data-target="btn-list1" onClick={this.btnClick1.bind(this)}>基础编辑</div>
	            <div data-target="btn-list2" onClick={this.btnClick1.bind(this)}>饰品</div>
	            <div data-target="btn-list3" onClick={this.btnClick1.bind(this)}>边框</div>
	            <div data-target="btn-list4" onClick={this.btnClick1.bind(this)}>场景</div>
            </div>
            <div id="btn-list1" className="btn-list" ref="basicevent">
            	<div className="glfxshow">inh</div>
	            <div className="glfxshow">blur</div>
	            <div className="glfxshow">lens blur</div>
	            <div className="glfxshow">vignetle</div>
	            <div className="glfxshow">sepig</div>
	            <div className="glfxshow">something</div>
            </div>
            <div id="btn-list2" className="btn-list">
            	<div className="watermark1" id="watermark1" data-target="shipin1" draggable="true" onDragStart={this.drag}></div>
	            <div className="watermark2" id="watermark2" data-target="shipin2" draggable="true" onDragStart={this.drag}></div>
	            <div className="watermark3" id="watermark3" data-target="shipin3" draggable="true" onDragStart={this.drag}></div>
	            <div>文字</div>
	            <div className="watermark4" id="watermark4" data-target="shipin4" draggable="true" onDragStart={this.drag}></div>
	            <div className="watermark5" id="watermark5" data-target="shipin5" draggable="true" onDragStart={this.drag}></div>
	            <div className="watermark6" id="watermark6" data-target="shipin6" draggable="true" onDragStart={this.drag}></div>
            </div>
            <div className="btn-listcopy">
            	<div className="watermark1" id="watermark1copy" data-target="shipin1" draggable="true" onDragStart={this.drag}></div>
	            <div className="watermark2" id="watermark2copy" data-target="shipin2" draggable="true" onDragStart={this.drag}></div>
	            <div className="watermark3" id="watermark3copy" data-target="shipin3" draggable="true" onDragStart={this.drag}></div>
	            <div>文字</div>
	            <div className="watermark4" id="watermark4copy" data-target="shipin4" draggable="true" onDragStart={this.drag}></div>
	            <div className="watermark5" id="watermark5copy" data-target="shipin5" draggable="true" onDragStart={this.drag}></div>
	            <div className="watermark6" id="watermark6copy" data-target="shipin6" draggable="true" onDragStart={this.drag}></div>
            </div>
            <div id="btn-list3" className="btn-list">
            	<div className="border1">边框1</div>
	            <div className="border2">边框2</div>
	            <div className="border3">边框3</div>
            </div>
            <div id="btn-list4" className="btn-list">
            	<div className="border4"></div>
	            <div className="border5"></div>
	            <div className="border6"></div>
            </div>
            </div>
			);
	}
}

export default Btn;