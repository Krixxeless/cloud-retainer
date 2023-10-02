import Image from "next/image";
import bannerButtonBackground from "@/public/wish-simulator/banner-button-background.png"
import bannerButtonBackgroundActive from "@/public/wish-simulator/banner-button-background-active.png"
import {BannerType} from "@/app/types/banner";
const BannerButton = ({bannerId, bannerType, isSelected, setBannerCallback}:
                          {bannerId: number, bannerType: BannerType, isSelected: boolean, setBannerCallback: () => void }) => {
    return (
        <button className={`z-10
                            cursor-genshin  
                            transition-all
                            w-1/4
                            md:w-[90%]
                            h-full
                            ${isSelected ? 'hover:scale-100' : 'hover:scale-[1.15]'}
                            `}
                onClick={setBannerCallback}>
            <Image
                src={isSelected ? bannerButtonBackgroundActive : bannerButtonBackground}
                alt={"Фон для кнопки выбора баннера"}
                className={`w-full ${isSelected ? 'scale-[1.15]' : 'scale-100'}`}
            />
        </button>
    )
}

export default BannerButton