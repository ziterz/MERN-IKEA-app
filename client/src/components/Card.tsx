import PropTypes from "prop-types";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
}

const Card = ({ product }: { product: Product }) => {
  return (
    <article className="group border-b-[1px] border-r-[1px] p-3 md:border-0">
      <div className="flex flex-col">
        <div className="card-header relative pb-5 pt-10">
          <div className="absolute right-0 top-0 flex justify-end">
            <span className="material-symbols-outlined leading-10 text-gray-300 group-hover:block md:hidden">
              favorite
            </span>
          </div>
          <a href="#">
            <div className="group relative pb-[100%]">
              <img
                src={product.images[0]}
                alt="product-1"
                className="absolute left-0 top-0 z-20 w-full object-cover transition-opacity duration-300 ease-in-out group-hover:opacity-0"
              />
              <img
                src={product.images[1]}
                alt="product-2"
                className="absolute left-0 top-0 z-10 w-full object-cover"
              />
            </div>
          </a>
        </div>
        <div className="relative">
          <div className="flex">
            <a href="#">
              <h6 className="text-base font-bold tracking-tight hover:cursor-pointer hover:underline">
                {product.name}
              </h6>
            </a>
          </div>
          <div className="mb-4">
            <span className="text-sm">{product.description}</span>
          </div>
          <div className="flex pb-2">
            <div
              className="mt-1 bg-yellow-300 px-1"
              style={{ boxShadow: "3px 3px #e00751" }}
            >
              <span className="text-xs font-bold">
                <sup>Rp</sup>
              </span>
              <span className="text-lg font-bold">
                {product.price.toLocaleString("id-ID")}
              </span>
            </div>
          </div>
          <button
            type="button"
            className="absolute bottom-0 right-0 cursor-pointer group-hover:block md:hidden"
            data-carousel-prev
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-700 text-white">
              <span className="material-symbols-outlined">
                add_shopping_cart
              </span>
              <span className="sr-only">Previous</span>
            </span>
          </button>
        </div>
      </div>
    </article>
  );
};

Card.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Card;
