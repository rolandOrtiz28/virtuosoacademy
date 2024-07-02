const express = require("express")
const router = express.Router()

router.get('/', (req,res)=>{
res.render('./about/index')

})

router.get('/team', (req,res)=>{
res.render('./about/team')

})




module.exports = router