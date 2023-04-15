const router = require('express').Router()

const {login , register} = require('./controllers/user')
const {getCriptoData, getCriptoDataWithIndianPrice} = require('./controllers/cripto')
const {Authentication, Authorization} = require('./middleware')

router.post('/user/register', register)
router.post('/user/login', login)

router.get('/user/cripto', Authentication , getCriptoData)
router.get('/user/getIndianPriceData',Authentication, Authorization , getCriptoDataWithIndianPrice)
module.exports = router