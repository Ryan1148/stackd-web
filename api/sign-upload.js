import crypto from 'crypto'

export default function handler(req, res) {
  const timestamp = Math.floor(Date.now() / 1000)

  const publicId = req.query.public_id

  const secret =
    process.env.CLOUDINARY_API_SECRET

  const apiKey =
    process.env.CLOUDINARY_API_KEY

  const stringToSign =
    `public_id=${publicId}&timestamp=${timestamp}`

  console.log('API KEY:', apiKey)
  console.log('SECRET EXISTS:', !!secret)
  console.log('STRING:', stringToSign)

  const signature = crypto
    .createHash('sha1')
    .update(stringToSign + secret)
    .digest('hex')

  console.log('SIGNATURE:', signature)

  res.status(200).json({
    timestamp,
    signature,
    apiKey,
    cloudName:
      process.env.CLOUDINARY_CLOUD_NAME,
  })
}