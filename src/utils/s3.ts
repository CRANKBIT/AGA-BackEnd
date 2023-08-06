import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommandOutput,
  DeleteObjectCommandOutput,
  GetObjectCommandOutput,
} from '@aws-sdk/client-s3'

const regionName = process.env.AWS_BUCKET_REGION
const accessKeyIdString = process.env.AWS_ACCESS_KEY
const secretAccessKeyString = process.env.AWS_SECRET_KEY
const bucketName = process.env.AWS_BUCKET_NAME

export async function PutObject(key: string, fileBody: Buffer): Promise<PutObjectCommandOutput> {
  const client = new S3Client({
    region: regionName,
    credentials: {
      accessKeyId: accessKeyIdString,
      secretAccessKey: secretAccessKeyString,
    },
  })
  const putParams = {
    Body: fileBody,
    Bucket: bucketName,
    Key: key,
  }
  const command = new PutObjectCommand(putParams)
  const response = await client.send(command)
  return response
}

export async function GetObject(key: string): Promise<GetObjectCommandOutput> {
  const client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: accessKeyIdString,
      secretAccessKey: secretAccessKeyString,
    },
  })
  const getParams = {
    Bucket: bucketName,
    Key: key,
  }
  const command = new GetObjectCommand(getParams)
  const response = await client.send(command)
  return response
}

export async function DeleteObject(key: string): Promise<DeleteObjectCommandOutput> {
  const client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: accessKeyIdString,
      secretAccessKey: secretAccessKeyString,
    },
  })
  const deleteParams = {
    Bucket: bucketName,
    Key: key,
  }
  const command = new DeleteObjectCommand(deleteParams)
  const response = await client.send(command)
  return response
}
