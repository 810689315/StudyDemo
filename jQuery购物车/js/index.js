$(function () {
    //网页打开时Html渲染
    products.forEach(function (item, index) {
        creatPLi('.prolist', item.img, item.price);
    });

    $('.prolist').on('click', '.addcart', function (e) {
        var index = $(this.parentNode).index();
        ctertCLi('.cartlist', products[index].img, products[index].price, products[index].id);

        var clickX = e.pageX;
        var clickY = e.pageY;
        $('.flydiv').css({ left: clickX, top: clickY });
        var _o = this;
        var targetX = $('.cart>button').offset().left - clickX;
        var targetY = $('.cart>button').offset().top - clickY;
        var flyImg = $('<img>').attr('src', products[index].img).css({ width: 50, height: 50 });
        $('.flydiv').html(flyImg).show();
        var fly = new Parabola({
            el: $('.flydiv'),
            offset: [targetX, targetY],
            duration: 500,
            curvature: 0.001,
            callback: function () {
                $('.flydiv').hide();
            }
        });
        fly.start();
        return false;
    });

    $('.cart')
        //购物车触摸滑出
        .hover(
            function () {
                $(this).stop().animate({
                    right: 0
                })
            },
            function () {
                $(this).stop().animate({
                    right: -300
                })
            })
        //清空购物车
        .on('click', 'h6', function () {
            $('.cartlist').empty();
            $('.cart button span').get(0).innerText = 0;
            $('.cart .bottom span').text('0.00');
        })
        //减少商品
        .on('click', '.sub', function () {
            var prodecutNum = $(this).siblings().first().text();
            if (prodecutNum <= 1) {
                $(this).siblings().first().text(1);
            } else {
                prodecutNum--;
                $(this).siblings().first().text(prodecutNum);
            }

            cartTopNum();
            allMoney();
        })
        //添加商品
        .on('click', '.plus', function () {
            var prodecutNum = parseInt($(this).siblings().eq(1).text());
            prodecutNum++;
            $(this).siblings().eq(1).text(prodecutNum);

            cartTopNum();
            allMoney();
        })
        //删除商品
        .on('click', '.del', function () {
            $(this).parent().parent().remove();

            cartTopNum();
            allMoney();
        });


    //创建.prolist的ul里的li
    function creatPLi(parent, imgSrc, price) {
        var li = $(`
            <li> 
                 <a href="#" class="img"><img src=${imgSrc} alt=""></a>
                <a href="#" class="title">阳澄湖大闸蟹</a>
                <span>￥${price}</span>
                <a href="#" class="addcart">加入购物车</a>
            </li>
        `);
        $(parent).append(li);
    }

    //创建商品购物车的li
    function ctertCLi(parent, imgSrc, price, id) {
        var li = $(`  <li>
        <div class="fl left">
            <a href="#">
             <img src="${imgSrc}" alt="">
            </a>
        </div>

        <div class="fl middle">
            <a href="#">阳澄湖大闸蟹</a>
            <p>单价:￥<span>${parseFloat(price).toFixed(2)}</span></p>
        </div>

        <div class="fr right">
            <button class="sub">-</button>
            <span>1</span>
            <button class="plus">+</button>
            <div class="del">删除</div>
        </div>
    </li>`);

        if (!(isRepeat(id))) {
            $(li).attr('data-id', id);
            $(parent).append(li);
        }

        cartTopNum();
        allMoney();
    }

    //改变购物车上面的小圆标点的数量大小
    function cartTopNum() {
        var num = 0;
        $(".cartlist li").each(function (index, li) {
            num = num + parseInt($(li).children(".right").children().eq(1).text());
            // num = num + parseInt($(li).children().find($('.right')).children().find($('span')).text());

        });
        $('.cart button span').get(0).innerText = num;
    }

    //计算总价钱
    function allMoney() {
        var money = 0;
        $(".cartlist li").each(function (index, item) {
            //获取li的id的方法
            var id = $(item).attr("data-id");
            //获取这个li有多少件
            var num = parseInt($(item).children(".right").children().eq(1).text());
            // 获取这个li的单价
            var unitPrice = parseInt(products[id].price);
            // 计算总价钱
            money += num * unitPrice;
        });

        $('.cart .bottom span').text(parseFloat(money).toFixed(2));
    }

    //判断是否重复
    function isRepeat(id) {
        var isRe = false;
        $(".cartlist li").each(function (index, li) {
            if (id == $(li).attr("data-id")) {
                var num = parseInt($(li).children(".right").children().eq(1).text());
                num++;
                $(li).children(".right").children().eq(1).text(num);
                isRe = true;
            }
        });
        return isRe;
    }








    
});