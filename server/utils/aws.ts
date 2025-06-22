import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import config from '../config';

const s3 = new S3Client({
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
  region: config.AWS_S3_REGION,
});

export async function uploadFileToS3(file: Express.Multer.File, fileName: string): Promise<string> {

  await s3.send(
    new PutObjectCommand({
        Bucket: config.AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype,
    })
  )

  return `${config.AWS_S3_URL}/${fileName}`;
}

export async function deleteFileFromS3(fileName: string): Promise<void> {
  await s3.send(
    new DeleteObjectCommand({
      Bucket: config.AWS_S3_BUCKET_NAME,
      Key: fileName,
    })
  );
}

export async function getFileUrlFromS3(fileName: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: config.AWS_S3_BUCKET_NAME,
    Key: fileName,
    ResponseContentDisposition: 'inline', //to display the file in browser
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
  return url;
}