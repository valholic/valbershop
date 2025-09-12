export default function DashboardCard({ name, amount, handleClick }) {
    return (
        <div className="flex flex-col gap-y-5 justify-center items-center w-full h-full rounded-2xl bg-[#d4af37] cursor-pointer hover:bg-[#d4af37]/90 font-Poiret" onClick={handleClick}>
            <p className="font-bold text-4xl">{ name }</p>
            <p className="font-semibold text-8xl">{ amount }</p>
        </div>
    )
}
