import { ProgressBar } from 'devextreme-react/progress-bar';
import useS3FileUploader from "../../hooks/useS3FileUploader";

const MAX_VALUE = 100;

export default function VideoV3({ filePath, onUploadComplete = () => { } }) {
    const { uploadFile, progress } = useS3FileUploader();

    const handleDragOver = (e) => e.preventDefault();

    const handleDrop = async (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];

        if (file) {
            const { name, size } = file || {};

            const dotIndex = name.lastIndexOf(".");

            if (dotIndex !== -1) {
                const fileTitle = name.substring(0, dotIndex);
                const fileExtension = name.substring(dotIndex + 1);

                const now = new Date();
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0');
                const day = String(now.getDate()).padStart(2, '0');
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');

                const formattedDateTime = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
                const fileName = `${fileTitle}-${formattedDateTime}.${fileExtension}`;
                console.log('final fine name>>>', fileName)

                const result = await uploadFile(file, fileName, `productvideo-ogs-${process.env.REACT_APP_ENVIRONMENT}`);
                console.log('my result >>>', result)
                if (result) onUploadComplete(result.Location);
            }
        }
    }

    function statusFormat(ratio) {
        return `Loading: ${ratio * 100}%`;
    }


    return (
        <div
            // onDrop={handleDrop}
            // onDragOver={handleDragOver}
            style={{
                width: "320px",
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <div className={`w-2/5 absolute flex justify-center z-10 ${(progress > 0 && progress < 100) ? 'visible' : 'invisible'}`}>
                <ProgressBar
                    id="progress-bar-status"
                    className={progress === MAX_VALUE ? 'complete' : ''}
                    width="90%"
                    min={0}
                    max={MAX_VALUE}
                    statusFormat={statusFormat}
                    value={progress}
                />
            </div>

            <video className={`videoElement ${(progress > 0 && progress < 100) ? 'opacity-25' : ''}`} width="320" height="200" controls style={{ height: '200px' }}>
                <source src={filePath} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <input type="file" accept="video/*" style={{ display: "none" }} />
        </div>
    );
}