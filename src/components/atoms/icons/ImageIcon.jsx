export default function ImageIcon({ icon, width = 16, classNames = 'inline' }) {
    return (
        <img src={icon} className={`${classNames}`} width={width}/>
    )
}