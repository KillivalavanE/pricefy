import Image from "next/image"

interface Props {
    tit: string,
    borderColor: string,
    iconSrc: string,
    value: string,
}
const PriceInfoCard = ({tit, borderColor, value, iconSrc}: Props) => {
  return (
    <div className={`price-info_card border-l-[${borderColor}]`}>
      <p className="text-base text-black-100">{tit}</p>
      <div className="flex gap-1">
        <Image src={iconSrc} alt="price-tag" width={24} height={24}/>
        <p className="text-2xl font-bold text-secondary">{value}</p>
      </div>
    </div>
  )
}

export default PriceInfoCard
