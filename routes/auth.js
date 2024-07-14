const express = require("express")
const router = express.Router()
const User = require('../model/auth');
const passport = require('passport')


router.get('/', (req,res)=>{
res.render('./auth/auth')

})

router.post('/register', async (req, res) => {
    try {
        const { email, password, fullname } = req.body;

        const passwordRegix = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!passwordRegix.test(password)) {
            req.flash('error', 'It must contain at least 1 uppercase letter and 1 number.');
            return res.redirect('/Authentication');
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            req.flash('error', 'A user with the given email is already registered.');
            return res.redirect('/Authentication');
        }

        const confirmPassword = req.body['confirm-password'];
        if (password !== confirmPassword) {
            req.flash('error', 'Passwords do not match.');
            return res.redirect('/Authentication');
        } else {
            const user = new User({ email, fullname });
            const registeredUser = await User.register(user, password);
            req.login(registeredUser, err => {
                if (err) return next(err);
                req.flash('success', `Welcome to Virtuoso Academy, ${fullname}`);
                res.redirect('/');
            });
        }
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/Authentication');
    }
});



module.exports = router