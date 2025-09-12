export default function InputFile({ name, label, handleChange, ...rest }) {
    return (
        <label htmlFor={name} className="text-[#d4af37] text-2xl font-semibold">
            { label }
            <input type="file" name={name} id={name} onChange={handleChange} className="my-5 w-full file:bg-[#d4af37] file:text-black file:p-2 file:rounded-lg file:cursor-pointer" {...rest} />
        </label>
    )
}
