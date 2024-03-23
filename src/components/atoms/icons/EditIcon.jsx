import pencilIcon from "../img/pencil_white.svg"

export default function EditIcon({ width = 16, classNames = '' }) {

    return (
        <img src={pencilIcon} className={`${classNames}`} width={width} />
    )
}