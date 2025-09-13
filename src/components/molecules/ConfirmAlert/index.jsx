import { Button } from "../../atoms"

export default function ConfirmAlert({ title, text, handleYes, handleNo}) {
    return (
        <div className="fixed inset-0 bg-black/70 z-60 flex items-center justify-center font-Poiret">
            <div className="w-[80%] md:w-[30%] h-[50%] md:h-[30%] absolute flex flex-col gap-y-10 z-70 bg-[#353535] text-white p-5 rounded-2xl">
                <p className="text-4xl text-center w-full font-bold">{ title }</p>
                <p className="text-2xl text-center w-full font-semibold">{ text }</p>
                <div className="flex gap-x-3 w-full justify-center">
                    <Button type={'button'} name={'Yes'} handleClick={handleYes} />
                    <Button type={'button'} name={'No'} handleClick={handleNo} />
                </div>
            </div>
        </div>
    )
}
