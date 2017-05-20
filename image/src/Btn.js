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
            canvas.draw(texture).ink(0.10).update();
            console.log(canvas);
            /*image.parentNode.insertBefore(canvas, image);
            image.parentNode.removeChild(image);*/
            image.src=canvas.toDataURL();
	}

	render(){
		return(
			<div className="btn-choose">
			<div onClick={this.handleClick.bind(this)}>油画</div>
            <div>基础编辑</div>
            <div>滤镜</div>
            <div>饰品</div>
            <div>边框</div>
            <div>场景</div>
            <div>拼图</div>
            </div>
			);
	}
}

export default Btn;