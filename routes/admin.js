const express = require("express")
const router = express.Router()

router.get('/dashboard', (req,res)=>{
res.render('./admin/dashboard')

})

router.get('/courses', (req,res)=>{
res.render('./admin/courses')

})




module.exports = router