/**
 * 使用fetch ajax获取json数据
 * @param  {str} url     			请求地址
 * @param  {object} options   请求配置，参考fetch文档
 *                            options支持额外的一个参数 query，用于方便使用查询参数
 * @return {Promise}      	  请求的promise
 */
export default (url, options = {}) => {
	let fetchUrl = url;
	if(options.query){
		let queryString = []
		
		Object.keys(options.query).forEach(key => {
			if(options.query[key] != undefined){
				queryString.push(key+'='+options.query[key])
			}
		})

		fetchUrl = fetchUrl + (fetchUrl.indexOf('?') > -1 ? '' : '?') + queryString.join('&')

		delete options.query
	}
	return fetch(fetchUrl, {
		headers: {
			'Accept': 'application/json',
	    'Content-Type': 'application/json',
	    ...options.headers
		},
	  credentials: 'include',
		method: 'GET' || options.method,
		...options
	})
	.then(res => res.json())

}
