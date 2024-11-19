// Home
export interface cardData {
    // 创建时间
    moment: string,
    // 留言 id
    id: number,
    // 用户 id
    userId: number,
    // 内容
    message: string,
    // 标签
    label: number,
    // 用户昵称
    name: string,
    // 点赞数
    like: number,
    // 评论数
    comment: number,
    // 背景色
    imgUrl: number,
    // 是否撤回
    revoke: number,
    // 是否举报
    report: number
}
