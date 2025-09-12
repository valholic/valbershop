export default function InputTPENT({ type, name, label, value, handleChange, width, ...rest }) {
    return (
        <label htmlFor={name} className={`text-[#d4af37] text-lg lg:text-2xl font-Poiret font-semibold ${width}`}>
            { label }
            <input type={type} id={name} name={name} className="w-full h-8 lg:h-12 rounded-md border border-[#d4af37] p-2 cursor-text" value={value ?? ""} onChange={handleChange} pattern={type === 'password' ? "[A-Za-z0-9@#*!]{8,}" : undefined} title={type === 'password' ? "Password must be at least 8 characters using letters, numbers, or @ # * !" : undefined} {...rest} />
        </label>
    )
}
