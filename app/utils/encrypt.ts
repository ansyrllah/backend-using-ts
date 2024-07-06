import bycrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const salt = 10;

//register
export async function encyrptPassword(password: string) {
   try {
      const result = bycrypt.hash(password, salt)
      return result
   }
   catch (e) {
      throw e
   }
}

//login
export async function checkPassword(encyrptPassword: string, password: string) {
   try {
      const result = await bycrypt.compare(password, encyrptPassword)
      return result
   }
   catch (e) {
      throw e
   }
}

export async function createToken(payload: any) {
      const result = jwt.sign(payload, 'secretkey', { expiresIn: '1h' })
      return result
}