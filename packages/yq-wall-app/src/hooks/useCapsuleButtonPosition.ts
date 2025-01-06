import { ref, onMounted } from "vue"

interface IButtonBoundingClientPosition {
    button_height: string
    button_top: string
    button_bottom: string
}

/**
 * 获取胶囊按钮的位置信息
 */
export const useCapsuleButtonPosition = () => {
    const capsuleButtonPositionData = ref<IButtonBoundingClientPosition>({
        button_height: '0px',
        button_top: '0px',
        button_bottom: '0px',
    })

    const initializeButtonPosition = () => {
        // 从缓存中获取胶囊按钮的位置
        const buttonBoundingClientPosition = uni.getStorageSync('buttonBoundingClientPosition')

        if (!buttonBoundingClientPosition) {
            // 如果缓存中没有数据，则获取胶囊按钮的位置并存储到缓存中
            const res = uni.getMenuButtonBoundingClientRect()
            uni.setStorageSync('buttonBoundingClientPosition', res)
        }

        // 更新响应式数据
        const { height, top, bottom } = uni.getStorageSync('buttonBoundingClientPosition');
        capsuleButtonPositionData.value.button_height = `${height}px` // 胶囊按钮的高度
        capsuleButtonPositionData.value.button_top = `${top}px` // 胶囊按钮的顶部距离页面顶部的距离
        capsuleButtonPositionData.value.button_bottom = `${bottom + 10}px` // 胶囊按钮的底部距离页面顶部的距离（增加 10px 的偏移）
    };

    onMounted(() => {
        initializeButtonPosition()
    })

    return capsuleButtonPositionData
}
