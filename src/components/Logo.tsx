/* eslint-disable @next/next/no-img-element */
interface LogoProps {
  textSize: number;
  iconWidth: number;
}
const Logo: React.FC<LogoProps> = ({ textSize, iconWidth }) => {
  return (
    <div className="flex items-center">
      <img src="/letterE.svg" alt="logo" width={iconWidth} />
      <span className={`font-extrabold text-white text-[${textSize}px]`}>
        RRE CMS
      </span>
    </div>
  );
};

export default Logo;
