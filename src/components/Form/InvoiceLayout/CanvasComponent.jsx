import React, { useEffect, useRef, } from 'react';
// import './InvoiceLayout.css';


const CanvasComponent = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d')


        context.beginPath();   // パスの初期化
        context.moveTo(0, 0)   // 開始地点
        context.lineTo(0, 1123)
        context.lineTo(314, 1123)
        context.quadraticCurveTo(0, 500, 0, 0);
        context.closePath();
        context.fillStyle = "hsl(197.6, 68%, 49.8%)";  // 塗りつぶしをセット
        context.fill();  // パスの情報をもとに塗りつぶし
        // context.quadraticCurveTo(cpx, cpy, x, y);
        // context.strokeStyle = ""; //枠線の色
        // context.stroke();  // パスの情報をもとに線を描画
        // context.lineWidth = 4;   // 線幅をセット
        // context.rect(10 , 10 , 300 , 100); // 矩形の座標をパスにセット

        context.beginPath();   // パスの初期化
        context.moveTo(0, 0)   // 開始地点
        context.quadraticCurveTo(0, 500, 314, 1123);
        context.lineTo(397, 1123)
        context.quadraticCurveTo(0, 400, 0, 0);
        context.closePath();
        context.fillStyle = "hsl(118, 36.6%, 68.4%)";  // 塗りつぶしをセット
        context.fill();  // パスの情報をもとに塗りつぶし

        context.beginPath();   // パスの初期化
        context.moveTo(0, 0)   // 開始地点
        context.quadraticCurveTo(0, 400, 397, 1123);
        context.lineTo(480, 1123)
        context.quadraticCurveTo(0, 400, 0, 0);
        context.closePath();
        context.fillStyle = "hsl(193.3, 90%, 90.1%)";
        context.fill();
        ////////////////////////////////////////////////////////////
        // context.beginPath();
        // context.rect(100, 0, 50, 50);
        // context.fillStyle = "device-cmyk(0 0% 0% 56.1%)";
        // context.fill();

        // context.beginPath();
        // context.rect(200, 0, 50, 50);
        // context.fillStyle = "device-cmyk(0% 0% 0% 56.1%)";
        // context.fill();

        // context.beginPath();
        // context.rect(300, 0, 50, 50);
        // context.fillStyle = "cmyk(0% 0% 0% 56.1%)";
        // context.fill();

        // context.beginPath();
        // context.rect(400, 0, 50, 50);
        // context.fillStyle = "cmyk(0 0% 0% 56.1%)";
        // context.fill();

        // context.beginPath();
        // context.rect(500, 0, 50, 50);
        // context.fillStyle = "device-cmyk(0% 0% 0% 0%)";
        // context.fill();

        // context.beginPath();
        // context.rect(600, 0, 50, 50);
        // context.fillStyle = "device-cmyk(0 0% 0% 0%)";
        // context.fill();

        // context.beginPath();
        // context.rect(700, 0, 50, 50);
        // context.fillStyle = "cmyk(0% 0% 0% 0%)";
        // context.fill();

        ///////////////////////////////////////////////////////////////////
        // context.beginPath();
        // context.rect(100, 100, 50, 50);
        // context.fillStyle = "cmyk(0 0% 0% 0%)";
        // context.fill();

        // context.beginPath();
        // context.rect(200, 100, 50, 50);
        // context.fillStyle = "cmyk(0% 0% 0% 43.4%)";
        // context.fill();

        // context.beginPath();
        // context.rect(300, 100, 50, 50);
        // context.fillStyle = "cmyk(% 0% 0% 43.4%)";
        // context.fill();

        // context.beginPath();
        // context.rect(400, 100, 50, 50);
        // context.fillStyle = "device-cmyk(0 0% 0% 43.4%)";
        // context.fill();

        // context.beginPath();
        // context.rect(500, 100, 50, 50);
        // context.fillStyle = "device-cmyk(0% 0% 0% 43.4%)";
        // context.fill();

        // context.beginPath();
        // context.rect(600, 100, 50, 50);
        // context.fillStyle = "device-cmyk(0% 0% 0% 38.1%)";
        // context.fill();

        // context.beginPath();
        // context.rect(700, 100, 50, 50);
        // context.fillStyle = "device-cmyk(0 0% 0% 38.1%)";
        // context.fill();
        //////////////////////////////////////////////////////

        // context.beginPath();
        // context.rect(100, 200, 50, 50);
        // context.fillStyle = "cmyk(0 0% 0% 38.1%)";
        // context.fill();

        // context.beginPath();
        // context.rect(200, 200, 50, 50);
        // context.fillStyle = "cmyk(0% 0% 0% 38.1%)";
        // context.fill();

        // context.beginPath();
        // context.rect(300, 200, 50, 50);
        // context.fillStyle = "device-cmyk(0% 0% 0% 44.6%)";
        // context.fill();

        // context.beginPath();
        // context.rect(400, 200, 50, 50);
        // context.fillStyle = "device-cmyk(0 0% 0% 44.6%)";
        // context.fill();

        // context.beginPath();
        // context.rect(500, 200, 50, 50);
        // context.fillStyle = "cmyk(0% 0% 0% 44.6%)";
        // context.fill();

        // context.beginPath();
        // context.rect(600, 200, 50, 50);
        // context.fillStyle = "hsl(0, 100%, 50%)";
        // context.fill();

        // context.beginPath();
        // context.rect(700, 200, 50, 50);
        // context.fillStyle = "hsl(360, 0%, 66%)";
        // context.fill();



    })
    return (
        <>
            <canvas ref={canvasRef} width={794} height={1123} />
            <script src="/lib/w3color.js"></script>
        </>
    )
}

export default CanvasComponent