//클라우드 서비스를 통해 deploy 한 후,
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod')
}else{
    module.exports = require('./dev');
}