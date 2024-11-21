import multer from 'koa-multer'
import path from 'path'
import fs from 'fs/promises'

// 配置 storage
const storage = multer.diskStorage({
    // 文件保存路径
    destination: async (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../public/uploads');

        try {
            await fs.access(uploadPath); // 检查目录是否存在
        } catch (error) {
            await fs.mkdir(uploadPath, { recursive: true })
        }

        cb(null, uploadPath);
    },
    // 修改文件名称
    filename: (req, file, cb) => {
        const fileFormat = file.originalname.split('.')
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1])
    },
})

// 文件上传限制
const limits = {
    fields: 10, // 非文件字段的数量
    fileSize: 12 * 500 * 1024, // 单位 b
    files: 10, // 文件的数量
}

// 加载配置
const upload = multer({ storage: storage, limits })


export default upload
