import crypto from 'crypto'

export const cryptAlgo = 'aes-256-cbc'
export const cryptoPassword = process.env.CRYPTO_PASSWORD || 'cryptoPassword'
export const cryptoSalt = process.env.CRYPTO_SALT || 'cryptoSalt'
export const cryptoKey = crypto.scryptSync(cryptoPassword, cryptoSalt, 32)
export const cryptoIv = process.env.CRYPTO_IV || '0123456789abcedf'
export const hashStretch = process.env.HASH_STRETCH ? parseInt(process.env.HASH_STRETCH, 10) : 5000
