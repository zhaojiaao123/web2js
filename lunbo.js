/*
* @Author: dell
* @Date:   2019-12-15 11:21:52
* @Last Modified by:   dell
* @Last Modified time: 2019-12-15 11:27:34
*/
var box=document.getElementById("box");
var list=document.getElementById("nav").children;
var a=document.getElementById("a");
var left=document.getElementById("left");
var right=document.getElementById("right");

var to=document.getElementById("top");
var i=1;
var move=true;

setInterval(function(){
	var no=parseInt(getStyle(to,'left'));
	if(no==-900){
		to.style.left=0;
	}
	else{
		to.style.left=no-2+"px";
	}
}, 30);

function nexter(){
	if(move){
		move=false;
		i++;
		change();
		animate(a,{left:-1200*i},function(){
			if(i>5){
				a.style.left="-1200px";
				i=1;
			}
			move=true;
		});	
	}
}

function priver(){
	if(move){
		move=false;
		i--;
		change();
		animate(a,{left:-1200*i},function(){
			if(i<1){
				a.style.left="-6000px";
				i=5;
			}
			move=true;
		});	
	}
}

var t=setInterval(nexter,3000);
right.onclick=nexter;
left.onclick=priver;

box.onmouseover=function(){
	animate(right,{opacity:50});
	animate(left,{opacity:50});
	clearInterval(t);
}

box.onmouseout=function(){
	animate(right,{opacity:0});
	animate(left,{opacity:0});
	t=setInterval(nexter,3000);
}

for(var j=0;j<5;j++){
	list[j].n=j;
	list[j].onclick=function(){
		i=this.n+1;
		change();
		animate(a,{left:-1200*i});

	}
}

function change(){
	for(var j=0;j<5;j++){
		list[j].className="";
	}
	if(i==6){
		list[0].className="c1";
	}
	else if(i<1){
		list[4].className="c1";
	}
	else{
		list[i-1].className="c1";
	} 
}

function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30);
}
