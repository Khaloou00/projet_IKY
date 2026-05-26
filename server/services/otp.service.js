import crypto from 'crypto'

export function generateOtp(length = 6) {
  return crypto.randomInt(10 ** (length - 1), 10 ** length).toString()
}

export function otpExpiresAt(minutes = 10) {
  return new Date(Date.now() + minutes * 60 * 1000)
}
