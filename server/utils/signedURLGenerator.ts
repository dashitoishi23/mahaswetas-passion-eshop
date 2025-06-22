import config from "server/config";
import { getFileUrlFromS3 } from "./aws";

export async function generateSignedUrl(imageURLs: string[]): Promise<string[]> {
  return await Promise.all(
    imageURLs.map(async (imageUrl) => {
      try {
        const fileName = imageUrl.split(`${config.AWS_S3_URL}/`)[1];
        return getFileUrlFromS3(fileName);
      } catch (error) {
        console.error(`Error generating signed URL for image ${imageUrl}:`, error);
        return imageUrl; // Fallback to original URL if error occurs
      }
    })
  );
}