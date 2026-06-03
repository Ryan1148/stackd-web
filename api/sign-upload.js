import crypto from 'crypto'

export const handler = () =>{
    const timestamp = Math.round(Date.now() / 1000)
    const secret = process.env.CLOUDINARY_SECRET_KEY

    const signature = crypto.createHash('sha1').update(`timestamp=${timestamp}${secret}`).digest('hex')

    return {
        timestamp,
        signature,
        secret
    }
}