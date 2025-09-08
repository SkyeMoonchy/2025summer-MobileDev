Page({
  data: {
    src: '',
    autoplay: false,
    danmuTxt: '',
    list: [
      {
        id: '1001',
        title: '杨国宜先生口述校史实录',
        videoUrl: 'http://arch.ahnu.edu.cn/__local/6/CB/D1/C2DF3FC847F4CE2ABB67034C595_025F0082_ABD7AE2.mp4?e=.mp4'
      },
      {
        id: '1002',
        title: '唐成伦先生口述校史实录',
        videoUrl: 'http://arch.ahnu.edu.cn/__local/E/31/EB/2F368A265E6C842BB6A63EE5F97_425ABEDD_7167F22.mp4?e=.mp4'
      },
      {
        id: '1003',
        title: '倪光明先生口述校史实录',
        videoUrl: 'http://arch.ahnu.edu.cn/__local/9/DC/3B/35687573BA2145023FDAEBAFE67_AAD8D222_925F3FF.mp4?e=.mp4'
      },
      {
        id: '1004',
        title: '吴仪兴先生口述校史实录',
        videoUrl: 'http://arch.ahnu.edu.cn/__local/5/DA/BD/7A27865731CF2B096E90B522005_A29CB142_6525BCF.mp4?e=.mp4'
      }
    ]
  },

  onLoad() {
    // 创建视频上下文
    this.videoCtx = wx.createVideoContext('myVideo');
    // 默认播放第一个视频
    if (this.data.list.length) {
      this.setData({
        src: this.data.list[0].videoUrl,
        autoplay: true
      });
    }
  },

  // 列表点击切换播放
  playVideo(e) {
    const url = e.currentTarget.dataset.url;
    if (!url) return;
    // 停止当前，避免声音重叠
    this.videoCtx.stop();
    // 切换新地址并播放
    this.setData({ src: url, autoplay: true });
    setTimeout(() => this.videoCtx.play(), 0);
  },

  // 弹幕输入
  getDanmu(e) {
    this.setData({ danmuTxt: e.detail.value });
  },

  // 发送随机颜色弹幕
  sendDanmu() {
    const text = (this.data.danmuTxt || '').trim();
    if (!text) {
      wx.showToast({ title: '请输入弹幕内容', icon: 'none' });
      return;
    }
    this.videoCtx.sendDanmu({
      text,
      color: this.getRandomColor()
    });
    this.setData({ danmuTxt: '' });
  },

  getRandomColor() {
    const toHex = (n) => {
      let s = n.toString(16);
      return s.length === 1 ? '0' + s : s;
    };
    return (
      '#' +
      toHex(Math.floor(Math.random() * 256)) +
      toHex(Math.floor(Math.random() * 256)) +
      toHex(Math.floor(Math.random() * 256))
    );
  },

  // 可选事件钩子
  handlePlay() {},
  handlePause() {},
  handleEnded() {}
});