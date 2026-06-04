import crypto from 'crypto'

export default function handler(req,res){
    const timestamp = Math.round(Date.now() / 1000)
    const secret = process.env.CLOUDINARY_SECRET_KEY
    const apiKey = process.env.CLOUDINARY_API_KEY
    const cloudName = process.env.CLOUDINARY_CLOUD_NAME

    const signature = crypto.createHash('sha1').update(`timestamp=${timestamp}${secret}`).digest('hex')

    res.status(200).json({
        timestamp,
        signature,
        apiKey,
        cloudName
    }) 
}