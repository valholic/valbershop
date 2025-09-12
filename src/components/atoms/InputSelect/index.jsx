export default function InputSelect({ name, label, options, value, handleChange, ...rest }) {
    return (
        <label htmlFor={name} className={`w-1/2 font-semibold text-[#d4af37] text-2xl`}>
            { label }
            <select name={name} id={name} value={value} onChange={handleChange} className="block text-black bg-[#d4af37] p-2 rounded-md font-semibold cursor-pointer" {...rest}>
                <option value="">Select one</option>
                {
                    options.map((option, i) => {
                        return <option value={option.toLowerCase()} key={i}>{option}</option>
                    })
                }
            </select>
        </label>
    )
}
