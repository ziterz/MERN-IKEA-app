import PropTypes from 'prop-types';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
}

const Card = ({ product }: { product: Product }) => {
  return (
    <article className='group border-r-[1px] border-b-[1px] p-3 md:border-0'>
      <div className='flex flex-col'>
        <div className='card-header relative pt-10 pb-5'>
          <div className='flex justify-end absolute right-0 top-0'>
            <span className='material-symbols-outlined leading-10 md:hidden group-hover:block text-gray-300'>
              favorite
            </span>
          </div>
          <a href='#'>
            <div className='relative group pb-[100%]'>
              <img
                src={product.images[0]}
                alt='product-1'
                className='object-cover w-full z-20 transition-opacity ease-in-out duration-300 group-hover:opacity-0 absolute top-0 left-0'
              />
              <img
                src={product.images[1]}
                alt='product-2'
                className='z-10 object-cover w-full absolute top-0 left-0'
              />
            </div>
          </a>
        </div>
        <div className='relative'>
          <div className='flex'>
            <a href='#'>
              <h6 className='text-base font-bold hover:cursor-pointer hover:underline tracking-tight'>
                {product.name}
              </h6>
            </a>
          </div>
          <div className='mb-4'>
            <span className='text-sm'>{product.description}</span>
          </div>
          <div className='flex pb-2'>
            <div
              className='bg-yellow-300 px-1 mt-1'
              style={{ boxShadow: '3px 3px #e00751' }}
            >
              <span className='text-xs font-bold'>
                <sup>Rp</sup>
              </span>
              <span className='text-lg font-bold'>
                {product.price.toLocaleString('id-ID')}
              </span>
            </div>
          </div>
          <button
            type='button'
            className='absolute right-0 bottom-0 cursor-pointer md:hidden group-hover:block'
            data-carousel-prev
          >
            <span className='inline-flex text-white items-center justify-center w-10 h-10 rounded-full bg-sky-700'>
              <span className='material-symbols-outlined'>
                add_shopping_cart
              </span>
              <span className='sr-only'>Previous</span>
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
