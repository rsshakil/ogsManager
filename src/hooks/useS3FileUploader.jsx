
import { useState } from 'react';
import http from '../utils/httpService';

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks

export default function useS3FileUploader() {
    const [progress, setProgress] = useState(0);

    const uploadFile = async (file, fileName, bucketName) => {
        const totalChunk = Math.ceil(file.size / CHUNK_SIZE);

        const initiateMultipartUpload = async () => {
            try {
                const response = await http.post('/manager/video/upload/s3', { operation: 'initiate', fileName, bucketName, chunkSize: totalChunk });
                return response;
            } catch (error) {
                console.log('error in init')
            }
        }

        const { uploadId, presignedUrls = [] } = await initiateMultipartUpload();
        return await uploadParts(file, presignedUrls, uploadId, fileName, bucketName);
    };

    const uploadParts = async (file, presignedUrls, uploadId, fileName, bucketName) => {

        return new Promise((resolve, reject) => {
            const parts = [];

            presignedUrls.forEach((url, index) => {
                const chunkFile = file.slice(index * CHUNK_SIZE, (index + 1) * CHUNK_SIZE);


                const xhr = new XMLHttpRequest();

                xhr.upload.onprogress = (event) => {
                    if (event.lengthComputable) {
                        const percentage = parseInt((event.loaded / event.total) * 100);
                        console.log(`Upload progress: ${percentage}%`);
                        setProgress(percentage);
                    }
                };

                xhr.onload = async () => {
                    if (xhr.status === 200) {
                        console.log('File uploaded successfully!');
                        parts.push({ ETag: 'ETagValue', PartNumber: index + 1 });

                        if (parts.length === presignedUrls.length) {
                            const result = await completeMultipartUpload(uploadId, parts, fileName, bucketName);
                            resolve(result);
                        }

                    } else {
                        console.error('Failed to upload file.', xhr);
                        reject(new Error('Failed to upload file.'));
                    }
                };

                xhr.onerror = () => {
                    if (xhr.status === 0) {
                        console.error('Connection to the server was aborted.', xhr);
                        setProgress(0);
                        reject(new Error('Failed to upload file.'));
                    }
                };

                xhr.open('PUT', url, true);
                // xhr.timeout = 3600000;
                xhr.setRequestHeader('Content-Type', '');
                xhr.send(chunkFile);
            })
        });
    };


    const completeMultipartUpload = async (uploadId, parts, fileName, bucketName) => {
        try {
            const { data } = await http.post('/manager/video/upload/s3', { uploadId, parts, operation: 'complete', fileName: fileName, bucketName });
            console.log('complete response >>>>', data);
            return data;

        } catch (error) {
            console.log('error occurred while complete', error);
        }
    };


    return {
        uploadFile,
        progress
    }
}

