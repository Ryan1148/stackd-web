import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client({
    region: process.env.AWS_S3_REGION,
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
})

export default async function handler(req,res){

    const {fileType,userID} = req.body

    const key = `uploads/${userID}-profile`
    const cmd = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key:key,
        ContentType:fileType
    })

    const signedURL = await getSignedUrl(
        s3,
        cmd,
        {expiresIn:60}
    )

    res.status(200).json({
        signedURL
    })
}