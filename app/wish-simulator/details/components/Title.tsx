import { CSSProperties } from "react";
import striptags from "striptags";

const Title = ({
  bannerTitle,
  palette,
}: {
  bannerTitle: string;
  palette: string;
}) => {
  return (
    <p
      style={{ "--palette": `rgb(${palette})` } as CSSProperties}
      className={
        "absolute text-[#595252] top-[5.5%] left-[13%] text-[1.5vw] [&_em]:text-[var(--palette)] [&_em]:not-italic"
      }
      dangerouslySetInnerHTML={{
        __html: `Молитва события: ${striptags(bannerTitle, "<em>")}`,
      }}
    ></p>
  );
};

export default Title;