import { PutObjectCommand ,GetObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createId } from "@paralleldrive/cuid2";
import s3Client from '@/lib/s3Client';



function getFileExtension(file: File) {
    // Split the name of the file by periods (.) and take the last part
    const parts = file.name.split('.');
    if (parts.length > 1) {
        return parts[parts.length - 1];
    } else {
        return ''; // No file extension found
    }
}

export async function getImageFromBucket(fileKey:string) {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileKey,
        });

        console.log('fileKey');
        console.log(fileKey);
        
        

        const responseUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        console.log('response url:');
        console.log(responseUrl);
        
        const response = await fetch(responseUrl,{cache:'no-cache'});
        if (!response.ok) {
            throw new Error(`Failed to fetch object: ${response.status} ${response.statusText}`);
          }
          
          const data = await response.text(); // Use response.text() or response.blob() depending on the content type
          
          // Handle or process the fetched data as needed
          console.log('Fetched object data:', data);
          console.log('Fetched object data:', data);
          
          return data;
    } catch (err: any) {
        console.error(err);
        throw Error(err.message);
    }
}

async function getSignedS3Url(file: File) {
    try {
        let fileKey = createId(); // You should define the createId function
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: `${fileKey}.${getFileExtension(file)}`,
            ACL:'public-read'
        });

        console.log("key: " + fileKey);

        const response = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return {url:response,key:`/${fileKey}.${getFileExtension(file)}`};
    } catch (err: any) {
        console.error(err);
        throw Error(err.message);
    }
}

async function uploadFileToPresignedUrl(presignedUrl: string, file: File) {
    try {
        const response = await fetch(presignedUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type,
                // 'x-amz-acl': 'public-read', // Set the Content-Type header based on the file type
            },
            body: file,
        });

        if (!response.ok) {
            throw new Error(`File upload failed with status: ${response.status}`);
        }

        console.log("File uploaded successfully:", response);
        return response
    } catch (err: any) {
        console.error("Error uploading file:", err);
        throw Error(err.message);
    }
}



export async function FileUpload(file: File) {

    try {
        const presignedUrlResponse = await getSignedS3Url(file)
        console.log(presignedUrlResponse);
        

        
        if(presignedUrlResponse?.url){
        const response = await uploadFileToPresignedUrl(presignedUrlResponse.url, file)

        console.log(response);
        

        return presignedUrlResponse.key
        }
        else{
            throw new Error('Error uploading file')
        }

    } catch (error:any) {
        throw new Error(error.message)

    }

}

