export const dataOne = (e: any) => {
    let d:any = new Date(e)
    let Y: any = d.getFullYear()
    let M:any = d.getMonth()
    let D: any = d.getDate()

    if(D < 10) {
        D = '0' + D
    }

    if(M < 10) {
        M = '0' + M
    }

    return Y + '.' + M + '.' + D
}
