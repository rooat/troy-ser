var config = require('./config')

async function tee()
{
let inviterx = await config.etzAdmin.findOne({where:{invite2_code:"abcdef"}});
console.log(inviterx)	
}
tee()