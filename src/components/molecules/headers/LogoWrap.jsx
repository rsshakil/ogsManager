
import { LogoType1OnlyImage } from "../../atoms/logo/LogoType1OnlyImage";
import { LogoType2OnlyText } from "../../atoms/logo/LogoType2OnlyText";
import { LogoType3ImageTop } from "../../atoms/logo/LogoType3ImageTop";
import { LogoType4ImageBottom } from "../../atoms/logo/LogoType4ImageBottom";
import { LogoType5ImageRight } from "../../atoms/logo/LogoType5ImageRight";
import { LogoType6ImageLeft } from "../../atoms/logo/LogoType6ImageLeft";

export const LogoWrap = () => {
    //画像と文字の表示形式
    const structureType = 1;
    switch (structureType) {
            case 1: // 画像だけ
            return (
                <LogoType1OnlyImage/>
            );
            case 2: // テキストだけ
            return (
                <LogoType2OnlyText/>
            );
            case 3: // [上]画像[下]テキスト
            return (
                <LogoType3ImageTop/>
            );
            case 4: // [下]画像[上]テキスト
            return (
                <LogoType4ImageBottom/>
            );
            case 5: // [右]画像[左]テキスト
            return (
                <LogoType5ImageRight/>
            );
            case 6: // [左]画像[右]テキスト
            return (
                <LogoType6ImageLeft/>
            );
            default:
            return (
                <LogoType6ImageLeft/>
            );
    }






    // return (
    //     <>
    //         <a 
    //             href={logoSettings.info.linkUrl} 
    //             className={`inline-block flex ${logoSettings.classes.justifyContent} ${logoSettings.classes.logoWrapCustomClass} p-2`} 
    //             target={isTargetBlank}
    //         >
    //             <div className={`flex justify-center bg-white ${logoSettings.classes.imageCustomClass}`}>
    //                 <img 
    //                     className={`object-contain bg-white ${imageWidth} ${imageHeight}`} 
    //                     src={logoSettings.info.imageUrl} 
    //                     alt={logoSettings.info.text} 
    //                 />
    //             </div>
    //             <div className={`${logoSettings.classes.textCustomClass}`}>
    //                 <p className={`${logoSettings.classes.textColor +' '+ textSize +' '+ textAlign +' '+ textWeight +' '+ letterSpacing +' '+ verticalAlign} whitespace-pre-wrap`} >{logoSettings.info.text}</p>
    //             </div>
    //         </a>
    //     </>
    // );
};
