var myData = [
    {
      id: 1,
      todoName: '抽烟',
      isDone: true,
    },
    {
      id: 2,
      todoName: '喝酒',
      isDone: true,
    },
    {
      id: 3,
      todoName: '烫头',
      isDone: false,
    },
    {
      id: 4,
      todoName: '学习',
      isDone: true,
    },
    {
      id: 5,
      todoName: '睡觉',
      isDone: false,
    },
    {
      id: 6,
      todoName: '吃饭',
      isDone: true,
    },
  ]
  //加载数据，动态创建li插入到ul.todo-main中
  addData();
  function addData() {
    //遍历myData数组，根据数组的长度创建li
    var newArr = myData.map(function (item, index) {
      if (item.isDone) {
        return '<li><label> <input type="checkbox" checked/> <span>' + item.todoName + '</span> </label><button class="btn btn-danger">删除</button></li>'
      } else {
        return '<li><label> <input type="checkbox" /> <span>' + item.todoName + '</span> </label><button class="btn btn-danger">删除</button></li>'
  
      }
    })
    //把的到的数组转为字符串插入到页面中
    var ul = document.querySelector('ul.todo-main')
    ul.innerHTML = newArr.join('')
    changeStyle();
    isAllChecked();
    isEmpty();
    changeNum();
  }
  //通过输入框添加数据
  iptAdd();
  function iptAdd() {
    var headIpt = document.querySelector('.todo-header>input')
    //给headIpt注册键盘事件
    headIpt.onkeyup = function (e) {
      //判断键值，如果是回车键就创建li标签并把输入框的值
      if (e.keyCode === 13) {
        var iptVal = document.querySelector('.todo-header>input').value.trim();
        //获取完数据后把输入框清空
        document.querySelector('.todo-header>input').value = '';
        //判断用户输入是否为空，如果为空则不插入数据
        if (!iptVal) {
          alert('输入含非法字符，请重新输入');
          return;
        }
        var ul = document.querySelector('ul.todo-main');
        var newLi = document.createElement('li');
        var str = '<label> <input type="checkbox" /> <span>' + iptVal + '</span> </label><button class="btn btn-danger">删除</button>';
        newLi.innerHTML = str;
        ul.appendChild(newLi);
        changeStyle();
        isAllChecked();
        isEmpty();
        changeNum();
      }
  
    }
  }
  //判断选中改变样式的函数
  function changeStyle() {
    //获取input的checked属性的值，判断是否选中
    var mainIpt = document.querySelectorAll('.todo-main input[type=checkbox]')
    var mainSpan = document.querySelectorAll('.todo-main>li>label>span')
  
    mainIpt.forEach(function (item, index) {
      if (item.checked) {
        mainSpan[index].classList.add('done')
      } else {
        mainSpan[index].classList.remove('done')
      }
    })
  }
  //给.todo-main的input和删除按钮添加点击事件（事件委托）
  (function () {
    var ul = document.querySelector('ul.todo-main');
  
    ul.onclick = function (e) {
  
      if (e.target.nodeName.toLowerCase() === 'input') {
        isAllChecked();
        changeStyle();
        changeNum();
      }
      //添加删除功能
      if (e.target.nodeName.toLowerCase() === 'button') {
        ul.removeChild(e.target.parentNode)
        isAllChecked();
        isEmpty();
        changeNum();
       
      }
    }
  
  })();
  //判断是否全部选中的函数
  function isAllChecked() {
    var mainIptChecked = document.querySelectorAll('.todo-main input:checked');
    var mainIpt = document.querySelectorAll('.todo-main input[type=checkbox]');
    var footerIpt = document.querySelector('.todo-footer input[type=checkbox]');
    var allChecked = mainIptChecked.length === mainIpt.length;
    footerIpt.checked = allChecked ? true : false;
  }
  //判断.todo-main是否为空的函数，如果为空则把.todo-footer隐藏否则显示
  function isEmpty() {
    var mainLi = document.querySelectorAll('.todo-main li');
    var footer = document.querySelector('.todo-footer');
    var ul = document.querySelector('ul.todo-main');
    var wrap = document.querySelector('.todo-wrap');
    var h1 = document.querySelector('.todo-wrap h1');
    ul.style.display = footer.style.display = mainLi.length ? 'block' : 'none';
    if (!mainLi.length) {
      var newH1 = document.createElement('h1')
      newH1.innerHTML = '任务列表为空'
      wrap.appendChild(newH1)
    } else if (h1 && mainLi.length) {
      wrap.removeChild(h1)
    }
  }
  //给.todo-footer注册点击事件
  (function () {
    var footerIpt = document.querySelector('.todo-footer input[type=checkbox]');
    footerIpt.onclick = function () {
      var mainIpt = document.querySelectorAll('.todo-main input[type=checkbox]');
      mainIpt.forEach(function (item, index) {
        item.checked = footerIpt.checked
      })
      changeStyle()
      changeNum();
    }
  })();
  //给todo-footer下的button注册点击事件
  (function () {
    var footerBtn = document.querySelector('.todo-footer button.btn-danger');
    var ul = document.querySelector('ul.todo-main');
    footerBtn.onclick = function () {
      var mainIptChecked = document.querySelectorAll('.todo-main input:checked');
      mainIptChecked.forEach(function (item) {
        item.parentNode.parentNode.remove()
      })
      isAllChecked();
      isEmpty();
      changeNum();
    }
  })();
  //封装一个函数来改变checkedNum和allNum
  function changeNum() {
    var checkedNum = document.querySelector('#checkedNum');
    var allNum = document.querySelector('#allNum');
    var mainIptChecked = document.querySelectorAll('.todo-main input:checked');
    var mainIpt = document.querySelectorAll('.todo-main input[type=checkbox]');
    allNum.textContent=mainIpt.length
    checkedNum.textContent=mainIptChecked.length 
  }
  