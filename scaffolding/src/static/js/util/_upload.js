/**
* 插件使用：
* 上拉加载，外层的height是固定的100%，所以在计算滚动条高度的时候要使用它的第一个子dom
* 用例：
    <div className="scroll">
      <ul className="list">
      </ul>
    </div>
  
    .scroll {
      height: 100%;
      overflow-y:scroll; 
    }

    const upload = $('.scroll').dropload({
      loadDownFn: () => {
      },
      loadUpFn: () => {
      },
    })
**/
var LANG = {
  cn : {
    upRefresh : '下拉刷新',
    releaseUpdate: '释放更新',
    loading: '加载中',
    downLoad: '上拉加载更多',
    redeayDownload: '加载完成',
  },
  en : {
    upRefresh: 'pull-to-refresh',
    releaseUpdate : 'release-to-update',
    loading: 'loading',
    downLoad: 'loading more',
    redeayDownload: 'finished load',
  },
};
var Lang = LANG[window.lang];
var win = window;
var doc = document;
var $win = $(win);
var $doc = $(doc);

$.fn.dropload = function(options){
  return new MyDropLoad(this, options);
};

var MyDropLoad = function(element, options){
  var me = this;
  me.$element = element;
  // 上方是否插入DOM
  me.upInsertDOM = false;
  // loading状态
  me.loading = false;
  // 是否有数据
  me.isData = true;
  me._scrollTop = 0;
  //提前加载距离
  me._threshold = 0;
  me.init(options);
};

  // 初始化
MyDropLoad.prototype.init = function(options){
  var me = this;
  me.opts = $.extend(true, {}, {
    scrollArea : me.$element,                                            // 滑动区域
    domUp : {                                                            // 上方DOM
      domClass   : 'dropload-up',
      domRefresh : '<div class="dropload-refresh">↓ ' + Lang.upRefresh + '</div>',
      domUpdate  : '<div class="dropload-update">↑ ' + Lang.releaseUpdate + '</div>',
      domLoad    : '<div class="dropload-load"><span class="loading"></span>' + Lang.loading + '...</div>'
    },
    domDown : {                                                          // 下方DOM
      domClass   : 'dropload-down',
      domRefresh : '<div class="dropload-refresh">↓ ' + Lang.downLoad + '</div>',
      domLoad    : '<div class="dropload-load"><span class="loading"></span>' + Lang.loading + '...</div>',
      domNoData  : '<div class="dropload-noData">' + Lang.redeayDownload + '</div>'
    },
    autoLoad : true,                                                     // 自动加载
    distance : 50,                                                       // 拉动距离
    threshold : '',                                                      // 提前加载距离
    loadUpFn : '',                                                       // 上方function
    loadDownFn : ''                                                      // 下方function
  }, options);

  // 如果加载下方，事先在下方插入DOM
  if(me.opts.loadDownFn != ''){
    if (!($('.dropload-down').length)) {
      me.$element.append('<div class="'+me.opts.domDown.domClass+'">'+me.opts.domDown.domRefresh+'</div>');
    }
    me.$domDown = $('.'+me.opts.domDown.domClass);
  }

  // 计算提前加载距离
  if(!!me.$domDown && me.opts.threshold === ''){
    // 默认滑到加载区2/3处时加载
    me._threshold = Math.floor(me.$domDown.height()*1/3);
  }else{
    me._threshold = me.opts.threshold;
  }

  // 判断滚动区域
  me.$scrollArea = me.opts.scrollArea;
  //滚动区域高度
  me._scrollWindowHeight = me.$element[0].scrollHeight;

  // 绑定触摸
  me.$element.on('touchstart',function(e){
    if(!me.loading){
      fnTouches(e);
      fnTouchstart(e, me);
    }
  });
  me.$element.on('touchmove',function(e){
    if(!me.loading){
      fnTouches(e, me);
      fnTouchmove(e, me);
    }
  });
  me.$element.on('touchend',function(){
    me._scrollTop = me.$scrollArea.scrollTop();
    if(!me.loading){
      fnTouchend(me);
    }
  });
  // 加载下方
  me.$scrollArea.on('scroll',function(){
    me._scrollTop = me.$scrollArea.scrollTop();
    if (!me._scrollContentHeight) {
      fnRecoverContentHeight(me)
    }
    // 滚动页面触发加载数据
    if(me.opts.loadDownFn != '' && !me.loading && (me._scrollContentHeight - me._threshold) <= (me._scrollWindowHeight + me._scrollTop)){
      loadDown(me);
    }
  });
};

// 重新获取文档高度
function fnRecoverContentHeight(me){
  me._scrollContentHeight = me.$element.children().first().height();
}

// touches
function fnTouches(e){
  if(!e.touches){
    e.touches = e.originalEvent.touches;
  }
}

// touchstart
function fnTouchstart(e, me){
  me._startY = e.touches[0].pageY;
  // 记住触摸时的scrolltop值
  me.touchScrollTop = me.$scrollArea.scrollTop();
}

// touchmove
function fnTouchmove(e, me){
  me._curY = e.touches[0].pageY;
  me._moveY = me._curY - me._startY;

  if(me._moveY > 0){
    me.direction = 'down';
  }else if(me._moveY < 0){
    me.direction = 'up';
  }

  var _absMoveY = Math.abs(me._moveY);

  // 加载上方
  if(me.opts.loadUpFn != '' && me.touchScrollTop <= 0 && me.direction == 'down'){
    e.preventDefault();

    me.$domUp = $('.'+me.opts.domUp.domClass);
    // 如果加载区没有DOM
    if(!($('.dropload-up').length) && !me.upInsertDOM){
      me.$element.prepend('<div class="'+me.opts.domUp.domClass+'"></div>');
      me.upInsertDOM = true;
    }
    
    fnTransition(me.$domUp,0);

    // 下拉
    if(_absMoveY <= me.opts.distance){
      me._offsetY = _absMoveY;
      // todo：move时会不断清空、增加dom，有可能影响性能，下同
      me.$domUp.html(me.opts.domUp.domRefresh);
      // 指定距离 < 下拉距离 < 指定距离*2
    }else if(_absMoveY > me.opts.distance && _absMoveY <= me.opts.distance*2){
      me._offsetY = me.opts.distance+(_absMoveY-me.opts.distance)*0.5;
      me.$domUp.html(me.opts.domUp.domUpdate);
    // 下拉距离 > 指定距离*2
    }else{
      me._offsetY = me.opts.distance+me.opts.distance*0.5+(_absMoveY-me.opts.distance*2)*0.2;
    }

    me.$domUp.css({'height': me._offsetY});
  }
}

// touchend
function fnTouchend(me){
  var _absMoveY = Math.abs(me._moveY);
  if(me.opts.loadUpFn != '' && me.touchScrollTop <= 0 && me.direction == 'down'){
    fnTransition(me.$domUp,300);

    if(_absMoveY > me.opts.distance){
      me.$domUp.css({'height':me.$domUp.children().height()});
      me.$domUp.html(me.opts.domUp.domLoad);
      me.loading = true;
      me.opts.loadUpFn(me);
    }else{
      me.$domUp.css({'height':'0'}).on('webkitTransitionEnd mozTransitionEnd transitionend',function(){
        me.upInsertDOM = false;
        $(this).remove();
      });
    }
    me._moveY = 0;
  }
}

// 加载下方
function loadDown(me){
  me.direction = 'up';
  me.$domDown.html(me.opts.domDown.domLoad);
  me.loading = true;
  me.opts.loadDownFn(me);
}

// 无数据
MyDropLoad.prototype.noData = function(flag){
  var me = this;
  if(flag === undefined || flag == true){
    me.isData = false;
  }else if(flag == false){
    me.isData = true;
  }
};

// 重置
MyDropLoad.prototype.resetload = function(){
  var me = this;
  if(me.direction == 'down' && me.upInsertDOM){
    me.$domUp.css({'height':'0'}).on('webkitTransitionEnd mozTransitionEnd transitionend',function(){
      me.loading = false;
      me.upInsertDOM = false;
      $(this).remove();
      fnRecoverContentHeight(me);
    });
  }else if(me.direction == 'up'){
    me.loading = false;
    // 如果有数据
    if(me.isData){
      // 加载区修改样式
      me.$domDown.html(me.opts.domDown.domRefresh);
      fnRecoverContentHeight(me);
    }else{
      // 如果没数据
      me.$domDown.html(me.opts.domDown.domNoData);
    }
  }
};

// css过渡
function fnTransition(dom,num){
  dom.css({
    '-webkit-transition':'all '+num+'ms',
    'transition':'all '+num+'ms'
  });
}