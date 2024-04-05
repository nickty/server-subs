exports.register = async (req, res) => {
  try {
    const { name, password } = req.body
    //validation
    if (!name) {
      return res.json({
        error: 'Name is required',
      })
    }
    if (!password || password.length < 6) {
      return res.json({
        error: 'Password is required and it should be at least 6 characters',
      })
    }
  } catch (error) {
    console.log(error)
  }
}
