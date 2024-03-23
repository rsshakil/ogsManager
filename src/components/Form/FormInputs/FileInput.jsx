import { AiOutlineClose } from "react-icons/ai";
import React, { useEffect, useState } from 'react';
import { CgCloseO } from 'react-icons/cg';
// import Loader from '../../Loading/Loader';//reactLoader
import Loader from '../../atoms/Loading/TherapistLoader';
import { useSelector } from 'react-redux';
import { useToast } from "../../../contexts/ToastContext";
import http from "../../../utils/httpService";
import CloseIcon from "../../atoms/icons/CloseIcon";
import CloseIconMoreWhite from "../../atoms/icons/CloseIconMoreWhite";
import CloseIconThinModified from "../../atoms/icons/CloseIconThinModified";

const FileInput = ({
    imgPath,
    name,
    acceptFileType = 'image/png, image/jpg, image/jpeg, image/gif',
    className='',
    imageClassName='',
    setUploadedImage,
    error,
    setError,
    acceptedDimensions = [],
    label='',
    labelPosition = 'left',
    imageType='vertical',
    bucketName=`itemimage-ogs-${process.env.REACT_APP_ENVIRONMENT}`
}) => {
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false)
    const [fileSizeError, setFileSizeError] = useState(false);
    const [extensionError, setExtensionError] = useState(false);
    const [fileDimensionError, setFileDimensionError] = useState(false);
    const acceptedExtensions = ['png', 'PNG', 'jpg', 'JPG', 'jpeg', 'JPEG', 'gif', 'GIF', 'ico', 'ICO'];
    const imageAttributes = {
        "vertical":{width:"360px",height:"240px"},
        "horizontal":{width:"240px",height:"360px"},
    }
    //Buffer is required to upload the file to s3 bucket
    window.Buffer = window.Buffer || require("buffer").Buffer;
    const handleUpload = async (e) => {
        let targetFile = e.target.files[0];
        let eTargetName = e.target.name;
        //dimension validation
        if (Array.isArray(acceptedDimensions) && acceptedDimensions.length > 0) {
            setFileDimensionError(false);

            try {
                const getDimension = (imageSrc) => new Promise(resolve => {
                    const image = new Image();
                    image.onload = () => {
                        const height = image.height;
                        const width = image.width;
                        resolve({ image, width, height });
                    };
                    image.src = imageSrc;
                });

                const { width, height } = await getDimension(window.URL.createObjectURL(targetFile));

                const found = acceptedDimensions.find(x => x.width == width && x.height == height);
                if (!found) {
                    setFileDimensionError(true);
                    showToast('file diemension', 'warning');
                    return null;
                }

            } catch (err) {
                console.log('Err while calculating dimension ', err)
                return null;
            }
        }

        // Random File Name
        const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const N = 16;
        let fileName = Array.from(crypto.getRandomValues(new Uint32Array(N)))
            .map((n) => S[n % S.length])
            .join('');


        const tName = targetFile.name;
        const extension = tName.substring(tName.lastIndexOf('.') + 1, tName.length);
        // changes file name
        var blob = targetFile.slice(0, targetFile.size, 'image/png');
        targetFile = new File([blob], `${fileName}.${extension}`, { type: 'image/png' });

        // Extension Check
        if (!acceptedExtensions.includes(extension)) {
            setError((prev) => ({ ...prev, [e.target.name]: true }));
            setFileSizeError(false);
            setExtensionError(true);
            showToast('file type error', 'warning');
            return;
/*
        // haga commentout 10/18 no limit
        } else if (targetFile?.size > 1000000) {
            setError((prev) => ({ ...prev, [e.target.name]: true }));
            setExtensionError(false);
            setFileSizeError(true);
            showToast('file size error', 'warning');
            return;
*/
        } else {
            setFileSizeError(false);
            setExtensionError(false);
        }
        if (!targetFile?.name.match(/\.(jpg|png|jpeg|gif|ico)$/i)) {
            setError((prev) => ({ ...prev, [e.target.name]: true }));
            showToast('Invalid image error', 'warning');
            return;
        }

        console.log('targetFile', targetFile);

        try {
           
            //file upload via API
// // send request to aws s3 bucket
const reader = new FileReader();
reader.onload = async function (e) {
    const text = e.target.result;

    const array = Buffer.from(new Int8Array(text));
    // console.log('array', array);
    const base64data = array.toString('base64');
    // console.log('base64data', base64data);
    try {

        setLoading(true);

        const headers = {
            'Content-Type': 'image/jpeg'
        };
        const body = base64data;
       
        const fileName = targetFile.name;
        const dirName = 'tmp';

        const response = await http.put(`/s3/${bucketName}/${dirName}/${fileName}`, body, { headers });
        console.log('response: ', response);
        const location = `https://${bucketName}.s3.ap-northeast-1.amazonaws.com/${dirName}/${fileName}`;
        if (true) {
            const responseData = {
                location: location,
                inputFeildName: eTargetName
            };
          
            setUploadedImage(responseData);
        }

        setLoading(false);
    } catch (err) {
        setLoading(false);
        console.log('File upload failed',err);
        setError((prev) => ({ ...prev, [eTargetName]: true }));
        showToast('File upload failed', 'warning');
    }
}
reader.readAsArrayBuffer(e.target.files[0]);
            //file upload via API
           
        } catch (err) {
            setError((prev) => ({ ...prev, [eTargetName]: true }));
        }
    };

    //handling image delete
    const handleDelete = async (imageSrc, name) => {
        // let uploadedImageArr = [...uploadedImage];
        // let removedImages = [];
        // const deleteImage = uploadedImageArr.map((uI, index) => {
        //     if (uI.name == imageName) {
        //         uploadedImageArr[index] = '';
        //         removedImages.push(imageName);
        //     }
        // });


        setUploadedImage({location:'',inputFeildName:name});
        const fileName = imageSrc ? imageSrc.split("/").pop() : '';
        const dirName = 'tmp';

        const response = await http.delete(`/s3/${bucketName}/${dirName}/${fileName}`);
        console.log('response: ', response);
        if (response) {
            console.log('deleted');
        } else { 
            console.log('fail to delete from s3')
        }
    };
    return (
    <>
            {loading && <Loader />}
                        
            {label && (
                <div className='flex flex-col justify-center items-center mb-1'>
                   <span className='text-[#ffffff] mt-3'>{label}</span> 
                </div>
            )}   
        <div className='bg-white p-1 relative outline-none border border-solid border-blue-100' style={imageAttributes[imageType]}>
        
            
                
            {!imgPath && (
                <>
                    <input type='file' className={`top-0 left-0 opacity-0 absolute w-full  h-full`}
                        name={name}
                        id={name}
                        onChange={handleUpload}
                        accept={acceptFileType}
                    />
                    <div className='flex flex-col justify-center items-center h-full file_choose_area'>
                        <span className='text-[#D5D5D5] font-bold'>ファイルをドロップ</span>
                        <span className='text-[#D5D5D5]'>または</span>
                        <span className='text-[#3682C2] mt-3'>ファイルを選択</span>
                    </div>
                </>
            )}

            {imgPath && (
                <div className='flex justify-center items-center h-full cursor-default'>
                    <img src={imgPath} className='w-full h-full object-contain' />
                    <CloseIconThinModified className='absolute top-2.5 right-2.5 cursor-pointer' width="32" height="32" color='#E01329'
                    onClick={() => handleDelete(imgPath, name)}
                    />
                </div>
            )}
            </div>
            </>
    );
};

export default FileInput;
