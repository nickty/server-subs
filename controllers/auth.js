const { hashPassword } = require('../helpers/auth')
const User = require('../models/user')

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

      const { password, ...rest } = user._doc

      return res.json({
        user: rest,
      })
    } catch (error) {
      console.log(error)
    }
  } catch (error) {
    console.log(error)
  }
}
