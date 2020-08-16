function jsonp(url,arg,fn){
    var srpt = document.createElement('script');
    var queryString = '';
    for(var key in arg){
        queryString += '&' + key+ '=' + arg[key] + '&';
    }
    var funName = 'fun_' + Math.random().toString().substr(3);
    console.log(funName);
    window[funName] = fn;
    if(url.indexOf('?') == -1){
        url += '?'+queryString;
    }else{
        url += queryString;
    }

    url += 'callback=' + funName;
    srpt.src = url;
    document.body.appendChild(srpt);

}
$(function () {
    jsonp('https://api.douban.com/v2/movie/in_theaters', {
        apikey: '0b2bdeda43b5688921839c8ecb20399b'
    }, function (data) {
        var htmlStr = '';
        var res = data.subjects;
        res.forEach(function (item, index) {
            if (index == 0) {
                htmlStr += `
                <div class="item active">
                <div class="row text-center">
                `;
            } else {
                htmlStr += `
                <div class="item">
                <div class="row text-center">
                `;
            }

            for (var per of item.casts) {
                if (per.avatars) {
                    htmlStr += `
                    <!-- ITEM-->
                    <div class="span3">
                        <div class="thumbnail product-item">
                            <a href="${per.alt}"><img
                                    src="${per.avatars.medium}"></a>
                        </div>
                        <h5>${per.name}</h5>
                        <p><a href="${per.alt}" rol="button"
                                class="btn btn-primary btn-sm">查看详情 &gt;&gt;</a></p>
                    </div>
                    <!-- ITEM-->
                    `;
                }
            }

            htmlStr += `
                </div>
              </div>  
            `;

            $("#myCarousel2 .carousel-inner").html(htmlStr);

        })
    });

    jsonp('https://api.douban.com/v2/movie/top250', {
        apikey: '0b2bdeda43b5688921839c8ecb20399b'
    }, function (data) {
        var htmlStr='';
        var rel = data.subjects;
        console.log(rel);
        for(var i = 0;i<rel.length;i++){
            htmlStr+=`<li><a href="https://movie.douban.com/subject/${rel[i].collect_count}">${rel[i].title}</a></li>`
        }
        $("#topTen").html(htmlStr);
    });
});

$("#searchBtn").click(function(){
    var searchContent = $("#searchInput").val().trim();
    if(searchContent==''){
        alert('输入查询内容');
    }else{
        jsonp('https://api.douban.com/v2/movie/search', {
            p:searchContent,
            apikey: '0b2bdeda43b5688921839c8ecb20399b'
        }, function (data) {
            htmlStr += `
                    <div>豆瓣搜索接口坏掉了，没办法显示数据了，你们知道就号楼二</div>
                `;

                $('#searchRes').html(htmlStr);
    });
    }

})