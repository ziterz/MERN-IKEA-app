import Logo from '/logo.svg';
import Card from '../components/Card';
import { useState } from 'react';

const Home = () => {
  const [products] = useState([
    {
      id: 1,
      name: 'VITLÖK',
      description:
        'flower box with holder, in/outdoor light grey-blue, 56x20 cm',
      price: 9900,
      images: [
        'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/312/1231280_PE915770_S3.webp',
        'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/312/1231279_PE915771_S3.webp',
      ],
    },
    {
      id: 2,
      name: 'LILLABO',
      description: '9-piece train set with rail, multicolor',
      price: 129000,
      images: [
        'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/124/0712403_PE728819_S4.webp',
        'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/781/0878178_PE625229_S4.webp',
      ],
    },
    {
      id: 3,
      name: 'DUKTIG',
      description: '5-piece toy kitchen utensil set, multicolour',
      price: 129000,
      images: [
        'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/117/0711777_PE728426_S4.jpg',
        'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/778/0877878_PE611147_S4.jpg',
      ],
    },
    {
      id: 4,
      name: 'TEODORES',
      description: 'Chair, green',
      price: 425000,
      images: [
        'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/142/1114283_PE871739_S4.webp',
        'https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/142/1114281_PE871741_S4.webp',
      ],
    },
  ]);

  return (
    <>
      <header>
        <nav className='bg-white w-100'>
          <div className='container-fluid bg-black hidden md:block'>
            <div className='container p-3 text-white text-center m-auto'>
              <ul className='text-xs list-none'>
                <li className='inline-block'>
                  <a href='#' className='p-2 hover:underline'>
                    Inspirations
                  </a>
                </li>
                <li className='inline-block'>
                  <a href='#' className='p-2 hover:underline'>
                    Planning Tools
                  </a>
                </li>
                <li className='inline-block'>
                  <a href='#' className='p-2 hover:underline'>
                    Track Your Online Order
                  </a>
                </li>
                <li className='inline-block'>
                  <a href='#' className='p-2 hover:underline'>
                    Store Information
                  </a>
                </li>
                <li className='inline-block'>
                  <a href='#' className='p-2 hover:underline'>
                    Interior Design Service
                  </a>
                </li>
                <li className='inline-block'>
                  <a href='#' className='p-2 hover:underline'>
                    Free layout design
                  </a>
                </li>
                <li className='inline-block'>
                  <a href='#' className='p-2 hover:underline'>
                    IKEA Family Rewards
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='container-fluid flex flex-col'>
            <div className='container m-auto flex items-center justify-between py-2'>
              <a href='#' className='absolute hidden lg:block'>
                <span className='-ms-12 material-symbols-outlined'>menu</span>
              </a>
              <a href='#' className='p-2'>
                <img src={Logo} alt='IKEA Logo' className='w-20 md:w-24 h-16' />
              </a>
              <div className='flex-grow ml-12 mr-4 rounded-full  bg-gray-100  focus-within:ring-2 focus-within:ring-sky-700 focus-within:bg-white hidden md:block'>
                <form id='search'>
                  <div className='relative py-2'>
                    <div className='cursor-pointer absolute inset-y-0 left-0 flex items-center pl-6 pr-4'>
                      <span className='material-symbols-outlined'>search</span>
                    </div>
                    <input
                      type='text'
                      name='search'
                      id='search'
                      className='block w-full rounded-full bg-transparent border-0 py-2 pl-16 text-gray-900 placeholder:text-gray-400 text-base h-11  focus:outline-none'
                      placeholder='Search...'
                    />
                  </div>
                </form>
              </div>
              <div className='flex'>
                <div className='ml-2 py-2 md:hidden'>
                  <a
                    href='#'
                    className='block w-10 h-10 hover:rounded-full hover:bg-gray-100 text-center'
                  >
                    <span className='material-symbols-outlined leading-10'>
                      search
                    </span>
                  </a>
                </div>
                <div className='ml-2 py-2'>
                  <a
                    href='#'
                    className='block w-10 h-10 hover:rounded-full hover:bg-gray-100 text-center'
                  >
                    <span className='material-symbols-outlined leading-10'>
                      person
                    </span>
                  </a>
                </div>
                <div className='ml-2 py-2'>
                  <a
                    href='#'
                    className='block w-10 h-10 hover:rounded-full hover:bg-gray-100 text-center'
                  >
                    <span className='material-symbols-outlined leading-10'>
                      favorite
                    </span>
                  </a>
                </div>
                <div className='ml-2 py-2'>
                  <a
                    href='#'
                    className='block w-10 h-10 hover:rounded-full hover:bg-gray-100 text-center'
                  >
                    <span className='material-symbols-outlined leading-10'>
                      shopping_basket
                    </span>
                  </a>
                </div>
                <div className='ml-2 py-2 lg:hidden'>
                  <a
                    href='#'
                    className='block w-10 h-10 hover:rounded-full hover:bg-gray-100 text-center'
                  >
                    <span className='material-symbols-outlined leading-10'>
                      menu
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <section id='carousel'>
          <div className='container m-auto flex-col'>
            <div className='hidden md:block'>
              <ul className='text-sm font-bold flex mr-auto p-2'>
                <li>
                  <a href='#' className='p-2 mr-2'>
                    Products
                  </a>
                </li>
                <li>
                  <a href='#' className='p-2 mr-2'>
                    Rooms
                  </a>
                </li>
                <li>
                  <a href='#' className='p-2 mr-2'>
                    Offers
                  </a>
                </li>
                <li>
                  <a href='#' className='p-2 uppercase text-red-600'>
                    Sale
                  </a>
                </li>
              </ul>
            </div>
            <div
              id='controls-carousel'
              className='group relative w-full mt-4 mb-8'
              data-carousel='static'
            >
              <div className='relative h-56 overflow-hidden md:h-96'>
                <div
                  className='duration-700 ease-in-out'
                  data-carousel-item='active'
                >
                  <img
                    src='https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1711083329636_3_0.webp'
                    className='absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
                    alt='carousel-1'
                  />
                </div>
              </div>
              <div className='hidden group-hover:block text-gray-300'>
                <button
                  type='button'
                  className='absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
                  data-carousel-prev
                >
                  <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
                    <span className='material-symbols-outlined pr-1'>
                      arrow_back_ios_new
                    </span>
                    <span className='sr-only'>Previous</span>
                  </span>
                </button>
                <button
                  type='button'
                  className='absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none'
                  data-carousel-next
                >
                  <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none'>
                    <span className='material-symbols-outlined'>
                      arrow_forward_ios
                    </span>
                    <span className='sr-only'>Next</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
        <section id='top-category'>
          <div className='container m-auto flex-col'>
            <div className='my-4'>
              <div className='text-center'>
                <h2 className='text-3xl font-bold mb-14'>Top Category Picks</h2>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6'>
                  <a
                    href='#'
                    className='rounded-lg hover:shadow-2xl w-3/4 lg:w-full mx-auto'
                  >
                    <img
                      className='rounded-lg mb-5'
                      src='https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/range/icons/1675665821_range.jpg'
                      alt='Non upholstered chairs'
                    />
                    <span className='text-base flex items-center justify-center min-h-11'>
                      Non upholstered chairs
                    </span>
                  </a>
                  <a
                    href='#'
                    className='rounded-lg hover:shadow-2xl w-3/4 lg:w-full mx-auto'
                  >
                    <img
                      className='rounded-lg mb-5'
                      src='https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/range/icons/1675665875_range.jpg'
                      alt='Chest of drawers'
                    />
                    <span className='text-base flex items-center justify-center min-h-11'>
                      Chest of drawers
                    </span>
                  </a>
                  <a
                    href='#'
                    className='rounded-lg hover:shadow-2xl w-3/4 lg:w-full mx-auto'
                  >
                    <img
                      className='rounded-lg mb-5'
                      src='https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/range/icons/1675670627_range.jpg'
                      alt='Cushions'
                    />
                    <span className='text-base flex items-center justify-center min-h-11'>
                      Cushions
                    </span>
                  </a>
                  <a
                    href='#'
                    className='rounded-lg hover:shadow-2xl w-3/4 lg:w-full mx-auto'
                  >
                    <img
                      className='rounded-lg mb-5'
                      src='https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/range/icons/1705024744_range.jpg'
                      alt='Sofas'
                    />
                    <span className='text-base flex items-center justify-center min-h-11'>
                      Sofas
                    </span>
                  </a>
                  <a
                    href='#'
                    className='rounded-lg hover:shadow-2xl w-3/4 lg:w-full mx-auto'
                  >
                    <img
                      className='rounded-lg mb-5'
                      src='https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/range/icons/1675665757_range.jpg'
                      alt='Home desks'
                    />
                    <span className='text-base flex items-center justify-center min-h-11'>
                      Home desks
                    </span>
                  </a>
                  <a
                    href='#'
                    className='rounded-lg hover:shadow-2xl w-3/4 lg:w-full mx-auto'
                  >
                    <img
                      className='rounded-lg mb-5'
                      src='https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/range/icons/1675666203_range.jpg'
                      alt='Mattresses'
                    />
                    <span className='text-base flex items-center justify-center min-h-11'>
                      Mattresses
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id='product'>
          <div className='container m-auto flex-col mt-12'>
            <div className='flex justify-between'>
              <div>
                <button
                  id='dropdownDefaultButton'
                  data-dropdown-toggle='dropdown'
                  className='text-black border focus:outline-none font-bold rounded-full text-xs px-5 py-2.5 text-center inline-flex items-center '
                  type='button'
                >
                  Sort by: Recommended{' '}
                  <span className='material-symbols-outlined'>expand_more</span>
                </button>
                <div
                  id='dropdown'
                  className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'
                >
                  <ul
                    className='py-2 text-sm text-gray-700 dark:text-gray-200'
                    aria-labelledby='dropdownDefaultButton'
                  >
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <span className=' text-sm text-gray-600'>Total items 1275</span>
              </div>
            </div>
            <ul className='flex justify-center lg:justify-end my-5'>
              <li className='flex items-center'>
                <a
                  href='#'
                  className='flex font-bold z-10 justify-center items-center  text-xs focus:z-20'
                  style={{ width: '2rem', height: '2rem', margin: '0 3px' }}
                >
                  <span className='material-symbols-outlined'>
                    chevron_left
                  </span>
                </a>
              </li>
              <li className='flex items-center'>
                <a
                  href='#'
                  className='flex font-bold z-10 justify-center items-center  text-xs focus:z-20'
                  style={{ width: '2rem', height: '2rem', margin: '0 3px' }}
                >
                  1
                </a>
              </li>
              <li className='flex items-center'>
                <a
                  href='#'
                  className='flex hover:font-bold z-10 justify-center items-center border  text-xs rounded-full focus:z-20'
                  style={{ width: '2rem', height: '2rem', margin: '0 3px' }}
                >
                  2
                </a>
              </li>
              <li className='flex items-center'>
                <a
                  href='#'
                  className='flex z-10 justify-center items-center  text-xs focus:z-20'
                  style={{ width: '2rem', height: '2rem', margin: '0 3px' }}
                >
                  ...
                </a>
              </li>
              <li className='flex items-center'>
                <a
                  href='#'
                  className='flex hover:font-bold z-10 justify-center items-center border  text-xs rounded-full focus:z-20'
                  style={{ width: '2rem', height: '2rem', margin: '0 3px' }}
                >
                  32
                </a>
              </li>
              <li className='flex items-center'>
                <a
                  href='#'
                  className='flex font-bold z-10 justify-center items-center  text-xs focus:z-20'
                  style={{ width: '2rem', height: '2rem', margin: '0 3px' }}
                >
                  <span className='material-symbols-outlined'>
                    chevron_right
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className='container m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
          <div className='container m-auto'>
            <ul className='flex justify-center lg:justify-end my-5'>
              <li className='flex items-center'>
                <a
                  href='#'
                  className='flex font-bold z-10 justify-center items-center  text-xs focus:z-20'
                  style={{ width: '2rem', height: '2rem', margin: '0 3px' }}
                >
                  <span className='material-symbols-outlined'>
                    chevron_left
                  </span>
                </a>
              </li>
              <li className='flex items-center'>
                <a
                  href='#'
                  className='flex font-bold z-10 justify-center items-center  text-xs focus:z-20'
                  style={{ width: '2rem', height: '2rem', margin: '0 3px' }}
                >
                  1
                </a>
              </li>
              <li className='flex items-center'>
                <a
                  href='#'
                  className='flex hover:font-bold z-10 justify-center items-center border  text-xs rounded-full focus:z-20'
                  style={{ width: '2rem', height: '2rem', margin: '0 3px' }}
                >
                  2
                </a>
              </li>
              <li className='flex items-center'>
                <a
                  href='#'
                  className='flex z-10 justify-center items-center  text-xs focus:z-20'
                  style={{ width: '2rem', height: '2rem', margin: '0 3px' }}
                >
                  ...
                </a>
              </li>
              <li className='flex items-center'>
                <a
                  href='#'
                  className='flex hover:font-bold z-10 justify-center items-center border  text-xs rounded-full focus:z-20'
                  style={{ width: '2rem', height: '2rem', margin: '0 3px' }}
                >
                  32
                </a>
              </li>
              <li className='flex items-center'>
                <a
                  href='#'
                  className='flex font-bold z-10 justify-center items-center  text-xs focus:z-20'
                  style={{ width: '2rem', height: '2rem', margin: '0 3px' }}
                >
                  <span className='material-symbols-outlined'>
                    chevron_right
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
