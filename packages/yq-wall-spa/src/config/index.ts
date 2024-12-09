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

/**
 * 项目默认配置项
 */
// interface OtherSettings {
//   weakMode: boolean
//   border: boolean
//   headerFixed: boolean
//   sidebarFixed: boolean
//   footerRequired: boolean
//   breadcrumbEnabled: boolean
//   loadingMethod: string
// }
//
// interface Settings {
//   overallStyle: any
//   themeColors: string[]
//   websiteFont: string
//   navigationMode: any
//   otherSettings: OtherSettings
// }
export const defaultSettings = {
  // 整体风格设置
  overallStyle: {
    optionOne: {
      backgroundColor: '#E5E7EB', // 背景颜色 (灰色)
      subOption: [
        {
          width: '33.33%', // 子选项宽度
          backgroundColor: '#FFFFFF' // 子选项背景色 (白色)
        },
        {
          height: '33.33%', // 子选项高度
          backgroundColor: '#FFFFFF' // 子选项背景色 (白色)
        }
      ]
    },
    optionTwo: {
      backgroundColor: '#E5E7EB', // 背景颜色 (灰色)
      subOption: {
        width: '33.33%', // 子选项宽度
        backgroundColor: '#1F2937' // 子选项背景色 (深灰色)
      }
    },
    optionThree: {
      backgroundColor: '#1F2937' // 背景颜色 (深灰色)
    },
    optionFour: {
      backgroundColor: '#FFFFFF' // 背景颜色 (白色)
    }
  },

  // 主题颜色设置
  themeColors: [
    '#F87171', // 红色
    '#FBBF24', // 橙色
    '#34D399', // 绿色
    '#3B82F6', // 蓝色
    '#A855F7' // 紫色
  ],

  // 网站字体设置
  websiteFont: 'sans-serif',

  // 导航模式
  navigationMode: {
    optionOne: '#1F2937',
    optionTwo: '#1F2937',
    optionThree: '#1F2937'
  },

  // 其他设置
  otherSettings: {
    weakMode: false, // 是否启用弱模式
    border: true, // 是否带边框
    headerFixed: false, // 头部是否固定
    sidebarFixed: false, // 侧边栏是否固定
    footerRequired: true, // 是否需要 Footer
    breadcrumbEnabled: true, // 是否开启面包屑
    loadingMethod: 'scroll' // 加载方式 (点击加载:click / 滚动刷新scroll)
  }
}
