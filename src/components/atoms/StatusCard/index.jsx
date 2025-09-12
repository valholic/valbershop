export default function StatusCard({ name, serviceTime }) {
    return (
        <div className="flex flex-row gap-x-8 items-center w-full h-fit p-4 text-white bg-[#353535] rounded-lg">
            <p className="text-2xl md:text-3xl 2xl:text-4xl font-semibold w-1/2">{ name }</p>
            <p className="text-lg md:text-2xl font-semibold w-1/2">Your service is ready at { serviceTime }</p>
        </div>
    )
}
