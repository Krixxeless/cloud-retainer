import Image from "next/image";

const MasterlessCurrency = ({title, path}: {title: string, path: string}) => {
    return (
        <div className={'flex place-items-center gap-2'}>
            <Image
                src={`/wish-simulator/${path}.webp`}
                alt={title}
                width={36}
                height={36}
                draggable={false}
                className={"w-1/2 select-none transition-all active:opacity-50"}
            ></Image>
            <p className={"font-genshin drop-shadow-[0_0_2px_rgba(0,0,0,0.5)] text-white text-base md:text-xl"}>0</p>
        </div>
    )
}

export default MasterlessCurrency