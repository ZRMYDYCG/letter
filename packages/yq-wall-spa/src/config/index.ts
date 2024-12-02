/**
 * @description 墙的类型
 * [0]留言墙
 * [1]照片墙
 * [2]视频墙
 * [3]音频墙
 * [4]链接墙
 * [5]问答墙
 * [6]公告墙
 * */
export const wallType = [
  {
    name: '留言墙',
    individual: '“每一言，每一语，都是池中的光。”'
  },
  {
    name: '照片墙',
    individual: '“勺池时光，记录每一刻的温柔。”'
  }
]

/**
 * @description 墙的标签
 * [0][] 文本墙
 * [1][] 图片墙
 * [2][] 视频墙
 * [3][] 音频墙
 * [4][] 链接墙
 * [5][] 问答墙
 * [6][] 公告墙
 * */
export const label = [
  ['留言', '目标', '理想', '过去', '将来', '爱情', '亲情', '友情', '秘密', '信条', '无题'],
  ['我', 'ta', '喜欢的', '有意义的', '值得纪念的', '母校', '生活', '天空', '我在的城市', '大海']
]

/**
 * @description 文本墙留言信息的颜色
 * */
export const cardColor = [
  'rgba(252, 175, 162, 0.30)',
  'rgba(255, 227, 148, 0.30)',
  'rgba(146, 230, 245, 0.30)',
  'rgba(168, 237, 138, 0.30)',
  'rgba(202, 167, 247, 0.30)',
  'rgba(212, 212, 212, 0.30)'
]

/**
 * @description 文本墙留言信息的颜色选项
 * */
export const cardColorOptions = [
  'rgba(252, 175, 162, 1)',
  'rgba(255, 227, 148, 1)',
  'rgba(146, 230, 245, 1)',
  'rgba(168, 237, 138, 1)',
  'rgba(202, 167, 247, 1)',
  'rgba(212, 212, 212, 1)'
]

/**
 * @description 用户注册后默认分配的头像颜色
 * */
export const portrait = [
  'linear-gradient(180deg, #FFA9D9 0%, #E83D3D 100%)',
  'linear-gradient(180deg, #FFA7EB 0%, #F026A8 100%)',
  'linear-gradient(180deg, #F5A8FF 0%, #BF23E5 100%)',
  'linear-gradient(180deg, #DFA1FF 0%, #9A36F0 100%)',
  'linear-gradient(180deg, #C9AAFF 0%, #6D3CF5 100%)',
  'linear-gradient(180deg, #9EAAFF 0%, #3846F4 100%)',
  'linear-gradient(180deg, #8CD8FF 0%, #2A6AF0 100%)',
  'linear-gradient(180deg, #7BE7FF 2%, #1E85E2 100%)',
  'linear-gradient(180deg, #92FDFF 0%, rgba(20, 178, 221, 0.1) 100%)', // 修正透明度的表示方式
  'linear-gradient(180deg, #89FED8 0%, #18C997 100%)',
  'linear-gradient(180deg, #D7FFA7 0%, #5ED52A 100%)',
  'linear-gradient(180deg, #FFED48 0%, #FD9E16 100%)',
  'linear-gradient(180deg, #FFDC83 0%, #F88816 100%)',
  'linear-gradient(180deg, #FFBA8D 1%, #EB6423 100%)'
]
