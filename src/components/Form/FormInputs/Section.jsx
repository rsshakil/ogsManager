

export default function Section({ caption, children, wrapClass = "" }) {

    return (
        <section className={`flex flex-col mb-3 ${wrapClass}`}>
            <label className="my-2 border-l-4  border-[#FACD42]" dangerouslySetInnerHTML={{ __html: caption }} ></label>
            {children}
        </section>
    )
}