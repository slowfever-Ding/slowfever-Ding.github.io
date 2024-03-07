/**
 * @description 获取数据
 * @param json_data
 * @returns {fetch:promise<json>}
 */
function getDataList(json_data) {
    return fetch(json_data)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                return Promise.reject({
                    status: response.status,
                    statusText: response.statusText
                })
            }
        })
        .then(data => {
            return data
        })
        .catch(err => {
            console.log(err)
        })
}
export {getDataList}