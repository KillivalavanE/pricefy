import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions"
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
type Props = {
  params: {id: string}
}
const ProductDetails = async({params : {id} } : Props) => {
  const product = await getProductById(id);
  const similarProducts = await getSimilarProducts(id);
  // console.log(similarProducts);
  if(!product) redirect('/');
  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image src={product.image} alt={product.title} width={580} height={400} className="mx-auto"/>
        </div>
        <div className="flex flex-1 flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">{product.title}</p>
              <Link href={product.url} target="_blank" className="text-base text-black opacity-70">Visit Product</Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image src="/assets/icons/red-heart.svg" height={20} width={20} alt="red-heart"/>
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image src="/assets/icons/bookmark.svg" width={20} height={20} alt="bookmark"/>
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image src="/assets/icons/share.svg" width={20} height={20} alt="share"/>
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[30px] font-bold text-secondary">{product.currency} {formatNumber(product.currentPrice)}</p>
              <p className="text-[20px] font-bold text-black opacity-50 line-through">{product.currency} {formatNumber(product.originalPrice)}</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image src="/assets/icons/star.svg" width={18} height={18} alt="star"/>
                  <p className="text-primary-orange font-semibold text-sm">4.5</p>
                </div>
                <div className="product-reviews">
                  <Image src="/assets/icons/comment.svg" width={18} height={18} alt="review"/>
                  <p className="text-black font-semibold text-sm">100 Reviews</p>
                </div>
              </div>
              <p className="text-sm opacity-50"><span className="text-green-500 font-semibold">93%</span> of the buyers have recommended this.</p>
            </div>
          </div>
          <div className="my-7 flex flex-col gap-5">
            <div className="flex flex-wrap gap-5">
              <PriceInfoCard tit="Current Price" iconSrc = "/assets/icons/price-tag.svg" value={`${product.currency} ${formatNumber(product.currentPrice)}`} borderColor="#b6dbff" />
              <PriceInfoCard tit="Average Price" iconSrc = "/assets/icons/chart.svg" value={`${product.currency} ${formatNumber(product.averagePrice)}`} borderColor="#b6dbff" />
              <PriceInfoCard tit="Highest Price" iconSrc = "/assets/icons/arrow-up.svg" value={`${product.currency} ${formatNumber(product.highestPrice)}`} borderColor="#b6dbff" />
              <PriceInfoCard tit="Lowest Price" iconSrc = "/assets/icons/arrow-down.svg" value={`${product.currency} ${formatNumber(product.lowestPrice)}`} borderColor="#b6dbff" /> 
            </div>
          </div>
          <Modal productId={id}/>
        </div>
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl text-secondary font-semibold">Product Description</h3>
          <div className="flex flex-col gap-6">
            {product?.description?.split("/n")}
          </div>
        </div>
        <Link href={product.url} target="_blank" className="flex justify-center">
        <button className="bg-secondary text-white rounded-[30px] hover:bg-opacity-70 p-4 flex gap-3 items-center justify-center text-lg font-semibold min-w-[200px] w-fit">
           <Image src="/assets/icons/bag.svg" width={22} height={22} alt="buy-now"/>
           Buy Now
        </button>
        </Link>
      </div>
      {similarProducts && similarProducts?.length>0 && (
        <div className="py-14 flex flex-col gap-2 w-full">
          <h3 className="section-text">Similar Products</h3>
          <div className="flex flex-wrap mt-7 gap-8 w-full">
            {similarProducts.map((product)=>(
              <ProductCard key={product.title} product={product}/>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetails
