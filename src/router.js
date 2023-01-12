const express = require('express')
const router = express.Router()
const SC = require('./studentController')
const MW = require('./middle')

router.post('/students',SC.create_Student )
router.post('/login', SC.login)
router.get('/students', MW.authentication , MW.authorization, SC.get_Student)
router.put('/students',  MW.authentication , MW.authorization, SC.update_student)
router.delete('/students', MW.authentication, MW.authorization , SC.delete_student)
module.exports = router