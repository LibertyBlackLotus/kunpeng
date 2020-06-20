/**
 * 部署时使用 外网部署config
 */
const SERVER_URL = 'http://localhost';    //本地测试
const SERVER_WEB_PORT = '8081';           //本地测试
const SERVER_COR = `${SERVER_URL}:8081`;  //本地测试

// const SERVER_URL = 'http://www.flat2time.com';  //外网部署
// const SERVER_WEB_PORT = '80';                   //外网部署
// const SERVER_COR = 'http://www.flat2time.com';  //外网部署

const SERVER_API_PORT = '8080';              //后端服务接口地址

module.exports = {
	SERVER_URL,
	SERVER_API_PORT,
	SERVER_WEB_PORT,
	SERVER_COR
}

