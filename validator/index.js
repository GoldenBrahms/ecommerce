exports.userSignupValidator = (req, res, next) => {
    req.check('name', 'Name is required').notEmpty()
    req.check('name')
    .isLength({ min:3 })
    .withMessage('Name must contains least 3 characters')
    req.check('email', 'email must between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4, max: 32
        })
    req.check('password', 'Password is required').notEmpty()
    req.check('password')
    .isLength({ min:6 })
    .withMessage('Password must contains least 6 characters')
    .matches(/\d/)
    .withMessage('password must containt a number')
    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({ error:firstError })
    }
    next();
        
}
exports.userSigninValidator = (req, res, next) => {
    req.check('email', 'email must between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4, max: 32
        })
    req.check('password', 'Password is required').notEmpty()
    req.check('password')
    .isLength({ min:6 })
    .withMessage('Password must contains least 6 characters')
    .matches(/\d/)
    .withMessage('password must containt a number')
    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({ error:firstError })
    }
    next();
        
}
exports.userInviteValidator = (req, res, next) => {
    req.check('email', 'email must between 3 to 32 characters').notEmpty()
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4, max: 32
        })
    
    const errors = req.validationErrors()
    if (errors) {
        const firstError = errors.map(error => error.msg)[0]
        return res.status(400).json({ error:firstError })
    }
    next();
        
}