/**
 * 卡片项传参参数
 */
export interface CardItemProps {
  /**
   * 标题
   */
  title: string
  /**
   * 背景色
   */
  bgColor: string
  /**
   * 底部按钮文本
   */
  buttonStr: string
}

/**
 * 书籍列表排列方向
 */
export enum BookListOrientation {
  /**
   * 水平展示
   */
  HORIZONTAL = 'horizontal',
  /**
   * 垂直展示
   */
  VERTICAL = 'vertical',
}
