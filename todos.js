var todolist = [
    {
        id:1,
        todoName:'吃饭',
        isDone: true,
    },
    {
        id:2,
        todoName:'睡觉',
        isDone:true,
    },
    {
        id:3,
        todoName:'敲代码',
        isDone:false,
    }
]

//将数据渲染到页面
//根据数据，动态的创建html的字符串
//遍历数组，根据数组元素的个数，创建多个动态的字符串
newArr();
function newArr(){
    let htmlArr = todolist.map(function(item,index){
        //如果item.isDone的值是true,就给input加checked,如果不是就不加
        if(item.isDone){
            return(
                '<li><label><input type="checkbox" checked/><span>'+
                item.todoName +
                '</span></label><button class="btn btn-danger">删除</button></li>'
            )  
        }else{
            return(
                '<li><label><input type="checkbox"/><span>'+
                item.todoName +
                '</span></label><button class="btn btn-danger">删除</button></li>'
            )  
        }
    })

    //然后将拼接好的字符串,添加到todo-main页面中
    let oUl = document.querySelector('ul.todo-main')
    oUl.innerHTML = htmlArr.join('')
    changeStyle();
    allCheckbox();
    isEmpty();
    changeNum();
}

//通过输入框添加数据
iptAdd();
function iptAdd(){
    let iptHead = document.querySelector('.todo-header>input')
    //给iptHead注册键盘抬起事件
    iptHead.onkeyup = function(e){
        //判断键值对，如果按下的是回车，就根据输入的内容，动态的创建li的字符串
        if(e.keyCode === 13){
            let iptVal = document.querySelector('.todo-header>input').value.trim();
            //获取完数据后把输入框清空
            document.querySelector('.todo-header>input').value = '';
            //判断用户输入的是否为空，如果为空则不插入数据
            if(!iptVal){
                alert('输入含有非法数字,请重新输入');
                return;
            }

            let oUl = document.querySelector('ul.todo-main')
            //获取一个新的li
            let newLi = document.createElement('li');
            let str = '<label><input type="checkbox" /><span>' +
            iptVal + 
             '</span></label><button class="btn btn-danger">删除</button>'

             newLi.innerHTML = str;
             oUl.appendChild(newLi);
             changeStyle();
             allCheckbox();
             isEmpty();
            changeNum();

        }
    }
}

//判断选中改变样式的函数
function changeStyle(){
    //获取input的checked的属性值，判断是否选中
    let mainIpt = document.querySelectorAll('.todo-main input[type = checkbox]');
    let mainBtn = document.querySelectorAll('.todo-main>li>label>span');
    mainIpt.forEach(function(item,index){
        if(item.checked){
            mainIpt[index].classList.add('done')
        }else{
            mainBtn[index].classList.remove('done')
        }
    })
}

//判断每一个任务项是否都被选中
function allCheckbox(){
    //获取所有任务项的个数
    let allItems = document.querySelectorAll('.todo-main input:checked');
    //获取被选中的任务项的个数
    let allCheckedItems = document.querySelectorAll('.todo-main input[type=checkbox]');
    let allFooterIpt = document.querySelector('.todo-footer input[type=chekbox]');
    let allChecked = allItems.length === allCheckedItems.length;
    allFooterIpt.checked = allChecked ? true : false;
}

//判断.todo-main是否为空的函数，如果为空则把.todo-footer隐藏，否则显示
function isEmpty(){
    let oLi = document.querySelectorAll('.todo-main li');
    let footer = document.querySelector('.todo-footer');
    let oUl = document.querySelector('ul.todo-main');
    let wrap = document.querySelector('todo-wrap');
    let h1 = document.querySelector('todo-wrap h1');
    oUl.style.display = footer.style.display = oLi.length ? 'block' : 'none';
    if(oLi.length){
        let newH1 = document.createElement('h1');
        newH1.innerHTML = '任务项为空';
        wrap.appendChild(newH1);
    }else if(h1 && oLi.length){
        wrap.removeChild(h1);
    }

}

//给.todo-main的input和删除按钮添加点击事件(事件委托)
(function(){
    let oUl = document.querySelector('ul.todo-main');
    oUl.onclick = function(e){
        if(e.target.nodeName.toLowerCase()==='input'){
            allCheckbox();
            changeStyle();
            changeNum();
        }
        //添加删除功能
        if(e.target.nodeName.toLowerCase()==='button'){
            oUl.removeChild(e.target.parentNode);
            allCheckbox();
            isEmpty();
            changeNum();
        }
    }
})();


//封装一个函数来改变checkedNum和allNum
function changeNum(){
    let checkedNum = document.querySelector('#checkedNum');
    let allNum = document.querySelector('#allNum');
    let allItems = document.querySelectorAll('.todo-main input:checked');
    let allCheckedItems = document.querySelectorAll('.todo-main input[type=checkbox]');
     allNum.textContent = allCheckedItems.length
     checkedNum.textContent = allItems.length
}



