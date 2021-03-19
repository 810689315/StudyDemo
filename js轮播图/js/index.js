window.addEventListener('load', function () {
    var ul = getElementNode('ul');
    var box = getElementNode('.box');
    var imglist = getElementNode('.imglist');
    var topBtn = getElementNode('.fl');
    var bottomBtn = getElementNode('.fr');

    function getElementNode(objName) {
        return document.querySelector(objName);
    }

    function ScrollImg() {
        this.ul = null;
        this.scrollview = null;
        this.imglist = null;
        this.topBtn = null;
        this.bottomBtn = null;
        this.imgs = null;
        this.scrollviewHeight = null;
        this.nowDataID;
    }

    ScrollImg.prototype = {
        constructor: ScrollImg,
    }

    ScrollImg.prototype.init = function (ul, scrollview, imglist, topBtn, bottomBtn) {
        this.ul = ul;
        this.scrollview = scrollview;
        this.imglist = imglist;
        this.topBtn = topBtn;
        this.bottomBtn = bottomBtn;
        this.imgs = imglist.children;
        this.scrollviewHeight = scrollview.offsetHeight;

        var firstImg = this.imgs[0].cloneNode(true);
        this.imglist.appendChild(firstImg);
        this.imglist.style.width = this.scrollviewHeight * this.imgs.length + "px";

        for (var i = 0; i < this.imgs.length - 1; i++) {
            var li = document.createElement('li');
            li.innerText = i;
            if (i == 0) li.className = "active";
            li.setAttribute("data-id", i);
            this.ul.appendChild(li);
        }
    }

    ScrollImg.prototype.chageLi = function (index, obj, distance, funtime) {
        //改变li
        for (var i = 0; i < ul.children.length; i++) {
            ul.children[i].className = "";
        }
        this.ul.children[index].className = 'active';
        //动画效果
        clearInterval(obj.timeID);
        obj.timeID = setInterval(function () {
            var top = obj.offsetTop;
            var speed = (distance - top) / (funtime / 2);
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            top += speed;
            obj.style.top = top + "px";
            if (top == distance) {
                clearInterval(obj.time);
            }
        }, funtime);
    }

    ScrollImg.prototype.toBoundary = function (index, imgsArr) {
        var didset = this.nowDataID;
        var willset = index;
        if ((didset == 0) && (willset == imgsArr.length - 2)) {
            this.nowDataID = didset;
            this.topBtn.click();
        } else if ((didset == imgsArr.length - 2) && (willset == 0)) {
            this.nowDataID = didset;
            this.bottomBtn.click();
        } else if ((didset == 0) && (willset == 1)) {
            this.imglist.style.top = "0px";
            this.nowDataID = didset;
            this.bottomBtn.click();
        }
        else {
            this.nowDataID = willset;
            var distance = this.nowDataID * this.scrollviewHeight;
            this.chageLi(this.nowDataID, this.imglist, -distance, 20);
        }
    }

    ScrollImg.prototype.play = function () {
        var self = this;

        //点击li事件
        this.ul.addEventListener('click', function (event) {
            event = event || window.event;
            var target = event.target;
            if (target.tagName == "LI") {
                self.toBoundary(target.getAttribute("data-id"), self.imgs);
            }
        });

        //下击事件
        this.bottomBtn.addEventListener('click', function () {
            if (self.nowDataID == 0) {
                self.imglist.style.top = "0px";
            }
            self.nowDataID++;
            var distance = self.nowDataID * self.scrollviewHeight;
            if (self.nowDataID == (self.imgs.length - 1)) self.nowDataID = 0;
            self.chageLi(self.nowDataID, self.imglist, -distance, 20);
        });

        //上击事件
        this.topBtn.addEventListener('click', function () {
            if (self.nowDataID <= 0) {
                self.nowDataID = self.imgs.length - 1;
                self.imglist.style.top = -self.nowDataID * self.scrollviewHeight + "px";
            }
            self.nowDataID--;
            var distance = self.nowDataID * box.offsetHeight;
            self.chageLi(self.nowDataID, self.imglist, -distance, 20);
        });

        //自动播放事件
        var timeID2 = setInterval(function () {
            self.bottomBtn.click();
        }, 2000);
        this.scrollview.addEventListener('mouseover', function () {
            clearInterval(timeID2);
        });
        this.scrollview.addEventListener('mouseout', function () {
            timeID2 = setInterval(function () {
                self.bottomBtn.click();
            }, 2000);
        });
    }

    var sc = new ScrollImg();
    sc.nowDataID = 0;
    sc.init(ul, box, imglist, topBtn, bottomBtn);//初始化
    sc.play();//运行效果
});