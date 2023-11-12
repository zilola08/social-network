import jwt from 'jsonwebtoken'

function jwtTokens(id,email) {
  const accessToken = jwt.sign(
    { id,email },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: '20s' }
  )
  const refreshToken = jwt.sign(
    { id,email },
    process.env.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: '5m' }
  )
  return ({accessToken, refreshToken})
}

module.exports = jwtTokens