/**
 * @description 通过id获取数据
 * @param id
 * @param dataArray
 * @returns {matchingData}
 */
function queryDataId(id, dataArray) {
    let matchingData = null
    for (let i = 0; i < dataArray.length; i++) {
        if (id === dataArray[i].id || id === dataArray[i].r_id || id === dataArray[i].a_id) {
            matchingData = dataArray[i]
            break
        }
    }
    return matchingData
}
export {queryDataId}

