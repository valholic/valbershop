export default function Textarea({ name, label, value, handleChange, ...rest }) {
    return (
        <label htmlFor={name} className="text-[#d4af37] text-lg lg:text-2xl font-Poiret font-semibold">
            { label }
            <textarea name={name} id={name} value={value} onChange={handleChange} className="w-full h-30 rounded-md border border-[#d4af37] p-2 cursor-text" {...rest} ></textarea>
        </label>
    )
}
