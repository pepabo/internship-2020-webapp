import crypto from 'crypto'
import { cryptAlgo, cryptoKey, cryptoIv, hashStretch } from '../config/crypto'

export const encrypt = (plaintext: string) => {
  if (plaintext === '') {
    return ''
  }
  const cipher = crypto.createCipheriv(cryptAlgo, cryptoKey, cryptoIv)
  let ciphertext = cipher.update(plaintext, 'utf8', 'base64')
  ciphertext += cipher.final('base64')
  return ciphertext
}

export const decrypt = (ciphertext: string) => {
  if (ciphertext === '') {
    return ''
  }
  const decipher = crypto.createDecipheriv(cryptAlgo, cryptoKey, cryptoIv)
  let plaintext = decipher.update(ciphertext, 'base64', 'utf8')
  plaintext += decipher.final('utf8')
  return plaintext
}

export const makeHash = (data: string, salt: string) => {
  let result = crypto
    .createHash('sha512')
    .update(data + salt)
    .digest('hex')
  for (let i = 0; i < hashStretch; i++) {
    result = crypto.createHash('sha512').update(result).digest('hex')
  }
  return result
}
