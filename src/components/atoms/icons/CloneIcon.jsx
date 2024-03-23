import icon from "../img/clone_white.svg";

export default function CloneIcon({ width = 16, classNames = '' }) {

    return (
        <img src={icon} className={`${classNames}`} width={width} />
    )
}