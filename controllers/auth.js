const { hashPassword, comparePassword } = require('../helpers/auth')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  try {
    const { name, password, email } = req.body
    //validation
    if (!name) {
      return res.json({
        error: 'Name is required',
      })
    }
    if (!email) {
      return res.json({
        error: 'Email is required',
      })
    }
    if (!password || password.length < 6) {
      return res.json({
        error: 'Password is required and it should be at least 6 characters',
      })
    }

    const exist = await User.findOne({ email })

    if (exist) {
      return res.json({
        error: 'Email is taken',
      })
    }

    // hashPassword
    const hashedPassword = await hashPassword(password)

    try {
      const user = await new User({
        name,
        email,
        password: hashedPassword,
      }).save()

      // create signed token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      })

      const { password, ...rest } = user._doc

      return res.json({
        token,
        user: rest,
      })
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    console.log(error)
  }
}

exports.login = async (req, res) => {
  try {
    // check for email
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      return res.json({ error: 'No user found' })
    }
    // check for password
    const match = await comparePassword(req.body.password, user.password)
    if (!match) {
      return res.json({ error: 'Wrong password' })
    }
    // create signed token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })
    const { password, ...rest } = user._doc

    res.json({
      token,
      user: rest,
    })
  } catch (error) {
    console.log(error)
  }
}
