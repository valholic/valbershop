export default function Button({ type, name, handleClick, width}) {
    return (
        <button type={type} onClick={handleClick} className={`bg-[#d4af37] rounded-md ${width} p-2 h-fit text-black lg:text-2xl font-mono font-semibold hover:bg-[#d4af37]/90 cursor-pointer`}>{ name }</button>
    )
}
