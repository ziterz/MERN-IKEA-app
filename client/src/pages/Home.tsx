import Card from "../components/Card";
import { useState } from "react";
import Header from "../components/Header";

const Home = () => {
  const [products] = useState([
    {
      id: 1,
      name: "VITLÖK",
      description:
        "flower box with holder, in/outdoor light grey-blue, 56x20 cm",
      price: 9900,
      images: [
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/312/1231280_PE915770_S3.webp",
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/312/1231279_PE915771_S3.webp",
      ],
    },
    {
      id: 2,
      name: "LILLABO",
      description: "9-piece train set with rail, multicolor",
      price: 129000,
      images: [
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/124/0712403_PE728819_S4.webp",
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/781/0878178_PE625229_S4.webp",
      ],
    },
    {
      id: 3,
      name: "DUKTIG",
      description: "5-piece toy kitchen utensil set, multicolour",
      price: 129000,
      images: [
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/117/0711777_PE728426_S4.jpg",
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/778/0877878_PE611147_S4.jpg",
      ],
    },
    {
      id: 4,
      name: "TEODORES",
      description: "Chair, green",
      price: 425000,
      images: [
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/142/1114283_PE871739_S4.webp",
        "https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/images/142/1114281_PE871741_S4.webp",
      ],
    },
  ]);

  return (
    <>
      <Header />
      <main>
        <section
          id="controls-carousel"
          className="group relative mb-8 mt-4 w-full"
          data-carousel="static"
        >
          <div className="relative h-56 overflow-hidden md:h-96">
            <div
              className="duration-700 ease-in-out"
              data-carousel-item="active"
            >
              <img
                src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/pageImages/page__en_us_1711083329636_3_0.webp"
                className="absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2"
                alt="carousel-1"
              />
            </div>
          </div>
          <div className="hidden text-gray-300 group-hover:block">
            <button
              type="button"
              className="group absolute start-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
              data-carousel-prev
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
                <span className="material-symbols-outlined pr-1">
                  arrow_back_ios_new
                </span>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="group absolute end-0 top-0 z-30 flex h-full cursor-pointer items-center justify-center px-4 focus:outline-none"
              data-carousel-next
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/30 group-hover:bg-white/50 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70">
                <span className="material-symbols-outlined">
                  arrow_forward_ios
                </span>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        </section>
        <section id="top-category">
          <div className="container m-auto flex-col">
            <div className="my-4">
              <div className="text-center">
                <h2 className="mb-14 text-3xl font-bold">Top Category Picks</h2>
                <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
                  <a
                    href="#"
                    className="mx-auto w-3/4 rounded-lg hover:shadow-2xl lg:w-full"
                  >
                    <img
                      className="mb-5 rounded-lg"
                      src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/range/icons/1675665821_range.jpg"
                      alt="Non upholstered chairs"
                    />
                    <span className="flex min-h-11 items-center justify-center text-base">
                      Non upholstered chairs
                    </span>
                  </a>
                  <a
                    href="#"
                    className="mx-auto w-3/4 rounded-lg hover:shadow-2xl lg:w-full"
                  >
                    <img
                      className="mb-5 rounded-lg"
                      src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/range/icons/1675665875_range.jpg"
                      alt="Chest of drawers"
                    />
                    <span className="flex min-h-11 items-center justify-center text-base">
                      Chest of drawers
                    </span>
                  </a>
                  <a
                    href="#"
                    className="mx-auto w-3/4 rounded-lg hover:shadow-2xl lg:w-full"
                  >
                    <img
                      className="mb-5 rounded-lg"
                      src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/range/icons/1675670627_range.jpg"
                      alt="Cushions"
                    />
                    <span className="flex min-h-11 items-center justify-center text-base">
                      Cushions
                    </span>
                  </a>
                  <a
                    href="#"
                    className="mx-auto w-3/4 rounded-lg hover:shadow-2xl lg:w-full"
                  >
                    <img
                      className="mb-5 rounded-lg"
                      src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/range/icons/1705024744_range.jpg"
                      alt="Sofas"
                    />
                    <span className="flex min-h-11 items-center justify-center text-base">
                      Sofas
                    </span>
                  </a>
                  <a
                    href="#"
                    className="mx-auto w-3/4 rounded-lg hover:shadow-2xl lg:w-full"
                  >
                    <img
                      className="mb-5 rounded-lg"
                      src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/range/icons/1675665757_range.jpg"
                      alt="Home desks"
                    />
                    <span className="flex min-h-11 items-center justify-center text-base">
                      Home desks
                    </span>
                  </a>
                  <a
                    href="#"
                    className="mx-auto w-3/4 rounded-lg hover:shadow-2xl lg:w-full"
                  >
                    <img
                      className="mb-5 rounded-lg"
                      src="https://d2xjmi1k71iy2m.cloudfront.net/dairyfarm/id/range/icons/1675666203_range.jpg"
                      alt="Mattresses"
                    />
                    <span className="flex min-h-11 items-center justify-center text-base">
                      Mattresses
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="product">
          <div className="container m-auto mt-12 flex-col">
            <div className="flex justify-between">
              <div>
                <button
                  id="dropdownDefaultButton"
                  data-dropdown-toggle="dropdown"
                  className="inline-flex items-center rounded-full border px-5 py-2.5 text-center text-xs font-bold text-black focus:outline-none "
                  type="button"
                >
                  Sort by: Recommended{" "}
                  <span className="material-symbols-outlined">expand_more</span>
                </button>
                <div
                  id="dropdown"
                  className="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-700"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                <span className=" text-sm text-gray-600">Total items 1275</span>
              </div>
            </div>
            <ul className="my-5 flex justify-center lg:justify-end">
              <li className="flex items-center">
                <a
                  href="#"
                  className="z-10 flex items-center justify-center text-xs  font-bold focus:z-20"
                  style={{ width: "2rem", height: "2rem", margin: "0 3px" }}
                >
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="#"
                  className="z-10 flex items-center justify-center text-xs  font-bold focus:z-20"
                  style={{ width: "2rem", height: "2rem", margin: "0 3px" }}
                >
                  1
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="#"
                  className="z-10 flex items-center justify-center rounded-full border  text-xs hover:font-bold focus:z-20"
                  style={{ width: "2rem", height: "2rem", margin: "0 3px" }}
                >
                  2
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="#"
                  className="z-10 flex items-center justify-center  text-xs focus:z-20"
                  style={{ width: "2rem", height: "2rem", margin: "0 3px" }}
                >
                  ...
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="#"
                  className="z-10 flex items-center justify-center rounded-full border  text-xs hover:font-bold focus:z-20"
                  style={{ width: "2rem", height: "2rem", margin: "0 3px" }}
                >
                  32
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="#"
                  className="z-10 flex items-center justify-center text-xs  font-bold focus:z-20"
                  style={{ width: "2rem", height: "2rem", margin: "0 3px" }}
                >
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="container m-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
          <div className="container m-auto">
            <ul className="my-5 flex justify-center lg:justify-end">
              <li className="flex items-center">
                <a
                  href="#"
                  className="z-10 flex items-center justify-center text-xs  font-bold focus:z-20"
                  style={{ width: "2rem", height: "2rem", margin: "0 3px" }}
                >
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="#"
                  className="z-10 flex items-center justify-center text-xs  font-bold focus:z-20"
                  style={{ width: "2rem", height: "2rem", margin: "0 3px" }}
                >
                  1
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="#"
                  className="z-10 flex items-center justify-center rounded-full border  text-xs hover:font-bold focus:z-20"
                  style={{ width: "2rem", height: "2rem", margin: "0 3px" }}
                >
                  2
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="#"
                  className="z-10 flex items-center justify-center  text-xs focus:z-20"
                  style={{ width: "2rem", height: "2rem", margin: "0 3px" }}
                >
                  ...
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="#"
                  className="z-10 flex items-center justify-center rounded-full border  text-xs hover:font-bold focus:z-20"
                  style={{ width: "2rem", height: "2rem", margin: "0 3px" }}
                >
                  32
                </a>
              </li>
              <li className="flex items-center">
                <a
                  href="#"
                  className="z-10 flex items-center justify-center text-xs  font-bold focus:z-20"
                  style={{ width: "2rem", height: "2rem", margin: "0 3px" }}
                >
                  <span className="material-symbols-outlined">
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
