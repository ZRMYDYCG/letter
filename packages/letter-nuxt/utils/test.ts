/** 验证一个值范围[min, max] */
export function range(value, param) {
  return value >= param[0] && value <= param[1]
}

/** 判断是否为空 */
export function empty(value) {
  return (
    value === null
    || value === undefined
    || (typeof value === 'string' && value.trim() === '')
    || (Array.isArray(value) && value.length === 0)
    || (value instanceof Object && Object.keys(value).length === 0)
  )
}

/** 是否图片格式 */
export function image(value) {
  const newValue = value.split('?')[0]
  const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i
  return IMAGE_REGEXP.test(newValue)
}

/** 是否视频格式 */
export function video(value) {
  const VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i
  return VIDEO_REGEXP.test(value)
}
