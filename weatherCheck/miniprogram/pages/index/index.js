Page({
  data: {
    region:['山东省','青岛市','黄岛区'],
    locationId:'', //初始化为空
  },
  regionChange:function(e){
    this.setData({region:e.detail.value});
    this.getLocationIdAndWeather();
  },

  //定义getLocationIdAndWeather函数调用GeoAPI，根据城市名称获取对应的LocationID。成功获取LocationID后，将其保存在 locationId中，并调用getWeather函数来获取天气信息
 getLocationIdAndWeather:function(){
  var that = this;
  wx.request({
    url: 'https://geoapi.qweather.com/v2/city/lookup?',
    data:{
      location:that.data.region[1],
      key:'a7e20169641040e29b3f2235a730e894'
    },
    success:function(res){
      if(res.data.code === "200" && res.data.location.length > 0){
        that.setData({
          locationId:res.data.location[0].id
        });
        that.getWeather();
      }
      else{
        console.log("获取LocationId失败");
      }
    },
    fail:function(err){
      console.log("请求失败",err);
    }
  });
},

//getWeather函数使用获取到的LocationID进行天气查询，并在控制台输出天气信息
//通过控制台信息，可以看到返回的天气信息存储到now数据对象中，获取成功。然后更新getWeather函数，将数据存到JS文件的data中
getWeather:function(){
  var that = this;
  wx.request({
    url: 'https://devapi.qweather.com/v7/weather/now?',
    data:{
      location:that.data.locationId,
      key:'a7e20169641040e29b3f2235a730e894'
    },
    success:function(res){
      console.log(res.data);
      that.setData({now:res.data.now});
    },
    fail:function(err){
      console.log("获取天气信息失败",err);
    }
  });
},

//生命周期函数--监听页面加载
//在页面加载时获取LocationID和天气信息
onLoad: function (options) {
  this.getLocationIdAndWeather();
},
});