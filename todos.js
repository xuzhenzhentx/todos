var todoList = [
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
    },
]

//将数据渲染到页面
//根据数据，动态的创建html的字符串
//遍历数组，根据数组元素的个数，创建多个动态的字符串
newArr();
function newArr(){
    var htmlArr = todoList.map(function(item,index){
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
    var oUl = document.querySelector('ul.todo-main')
    oUl.innerHTML = htmlArr.join('')
    changeStyle();
    allCheckbox();
    isEmpty();
    changeNum();
}

//通过输入框添加数据
iptAdd();
function iptAdd(){
    var iptHead = document.querySelector('.todo-header>input')
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

            var oUl = document.querySelector('ul.todo-main')
            //获取一个新的li
            var newLi = document.createElement('li');
            var str = '<label><input type="checkbox" /><span>' +
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
    var mainIpt = document.querySelectorAll('.todo-main input[type = checkbox]');
    var mainBtn = document.querySelectorAll('.todo-main>li>label>span');
    mainIpt.forEach(function(item,index){
        if(item.checked){
            mainIpt[index].classList.add('done')
        }else{
            mainBtn[index].classList.remove('done')
        }
    })
}

//给.todo-main的input和删除按钮添加点击事件(事件委托)
(function(){
    var oUl = document.querySelector('ul.todo-main');
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

//判断每一个任务项是否都被选中
function allCheckbox(){
    //获取所有任务项的个数
    var allItems = document.querySelectorAll('.todo-main input:checked');
    //获取被选中的任务项的个数
    var allCheckedItems = document.querySelectorAll('.todo-main input[type=checkbox]');
    var allFooterIpt = document.querySelector('.todo-footer input[type=chekbox]');
    var allChecked = allItems.length === allCheckedItems.length;
    allFooterIpt.checked = allChecked ? true : false;
}

//判断.todo-main是否为空的函数，如果为空则把.todo-footer隐藏，否则显示
function isEmpty(){
    var oLi = document.querySelectorAll('.todo-main li');
    var footer = document.querySelector('.todo-footer');
    var oUl = document.querySelector('ul.todo-main');
    var wrap = document.querySelector('todo-wrap');
    var h1 = document.querySelector('todo-wrap h1');
    oUl.style.display = footer.style.display = oLi.length ? 'block' : 'none';
    if(!oLi.length){
        var newH1 = document.createElement('h1');
        newH1.innerHTML = '任务项为空';
        wrap.appendChild(newH1);
    }else if(h1 && oLi.length){
        wrap.removeChild(h1);
    }

}

//给todo-footer注册点击事件
(function(){
    var allCheckedItems = document.querySelector('.todo-main input[type=checkbox]');
    footer.onclick = function(){
        var allFooterIpt = document.querySelectorAll('.todo-footer input[type=chekbox]'); 
        allFooterIpt.forEach(function(item, index){
            item.checked = allCheckedItems.checked
        })
        changeStyle();
        changeNum();
        
    }
})();

//给todo-footer下的button注册点击事件
(function(){
    var footerBtn = document.querySelector('.todo-footer>button.btn-danger');
    var oUl = document.querySelector('ul.todo-main');
    footerBtn.onclick = function(){
        var allItems = document.querySelectorAll('.todo-main input:checked');
        allItems.forEach(function(item, index){
            item.parentNode.parentNode.remove()
        }) 
        allCheckbox()
        isEmpty()
        changeNum()
    }
})




//封装一个函数来改变checkedNum和allNum
function changeNum(){
    var checkedNum = document.querySelector('#checkedNum');
    var allNum = document.querySelector('#allNum');
    var allItems = document.querySelectorAll('.todo-main input:checked');
    var allCheckedItems = document.querySelectorAll('.todo-main input[type=checkbox]');
     allNum.textContent = allCheckedItems.length
     checkedNum.textContent = allItems.length
}



