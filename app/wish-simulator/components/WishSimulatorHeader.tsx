import Image from "next/image";
import wishIcon from "@/public/wish-simulator/wish-icon.png"
import BannerList from "@/app/wish-simulator/components/headerComponents/BannerList";
import CurrentBalance from "@/app/wish-simulator/components/headerComponents/CurrentBalance";
const WishSimulatorHeader = () => {
    return (
        <header className={"flex justify-between items-center"}>
            <div className={"flex items-center gap-10 ml-12"}>
                <Image
                    src={wishIcon}
                    alt={"Иконка раздела молитв из игры Genshin Impact"}
                    quality={100}
                    width={80}
                />
                <p className={"font-genshin text-white text-2xl drop-shadow-[0_0.5px_1.5px_rgba(0,0,0,0.8)]"}>Молитва</p>
            </div>
            <BannerList/>
            <CurrentBalance/>
        </header>
    )
}
export default  WishSimulatorHeader