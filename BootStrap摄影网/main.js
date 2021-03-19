var windowHeight = $(window).height()
var elementTop = $(".our").offset().top
if (windowHeight > elementTop) {
    $(".our").css("top", "0")
}


// 监听页面窗口滚轮
$(window).scroll(function () {
    var top = $(window).scrollTop()
    console.log("页面滑动了" + top + "像素")
    if (top > 300) {
        $(".our").css("top", "0")
    }
    // 监听我们的理念
    if (windowHeight + top > $(".imgBox").offset().top) {
        $(".dream").css("left", "0")
        $(".imgBox").css("right", "0")
    }

    // 背景图片盒子
    for (var j = 0; j < $(".text-box").length; j++) {
    
        if (windowHeight + top > $(".text-box").eq(j).offset().top) {
            if(j == 1){
                $(".text-box > div").eq(j).css("left", "0")
            }else{
                $(".text-box > div").eq(j).css("right", "0")
            }
        }
    }

    for (var i = 0; i < $(".cardBox").length; i++) {
        console.log(i)
        if (windowHeight + top > $(".cardBox").eq(i).offset().top - 100) {
            $(".card>div").eq(i).css("top", "0")
        }
    }
})