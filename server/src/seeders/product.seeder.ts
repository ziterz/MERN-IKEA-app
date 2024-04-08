import { Category } from '../models/Category.model';
import { Product } from '../models/Product.model';

export const productSeeder = async () => {
  const categories = [
    {
      name: 'Furniture',
      image:
        'https://www.ikea.com/global/assets/range-categorisation/images/dining-furniture-700417.jpeg?imwidth=400',
    },
    {
      name: 'Storage & organization',
      image:
        'https://www.ikea.com/global/assets/range-categorisation/images/clothes-stands-shoe-racks-st005.jpeg?imwidth=400',
    },
    {
      name: 'Kitchen & appliances',
      image:
        'https://www.ikea.com/global/assets/range-categorisation/images/kitchens-ka003.jpeg?imwidth=400',
    },
    {
      name: 'Beds & mattresses',
      image:
        'https://www.ikea.com/us/en/range-categorisation/images/beds-bm003.jpeg?imwidth=400',
    },
    {
      name: 'Lighting',
      image:
        'https://www.ikea.com/global/assets/range-categorisation/images/bathroom-lighting-10736.jpeg?imwidth=400',
    },
    {
      name: 'Home textiles',
      image:
        'https://www.ikea.com/global/assets/range-categorisation/images/bath-textiles-tl003.jpeg?imwidth=400',
    },
    {
      name: 'Home décor',
      image:
        'https://www.ikea.com/global/assets/range-categorisation/images/home-fragrance-42926.jpeg?imwidth=400',
    },
    {
      name: 'Kitchenware & tableware',
      image:
        'https://www.ikea.com/us/en/range-categorisation/images/dinnerware-18860.jpeg?imwidth=400',
    },
    {
      name: 'Kitchenware & tableware',
      image:
        'https://www.ikea.com/us/en/range-categorisation/images/dinnerware-18860.jpeg?imwidth=400',
    },
    {
      name: 'Baby & kids',
      image:
        'https://www.ikea.com/global/assets/range-categorisation/images/children-bc003.jpeg?imwidth=400',
    },
    {
      name: 'Laundry & cleaning',
      image:
        'https://www.ikea.com/global/assets/range-categorisation/images/laundry-cabinets-shelving-48925.jpeg?imwidth=400',
    },
    {
      name: 'Bathroom',
      image:
        'https://www.ikea.com/global/assets/range-categorisation/images/bathroom-systems-700450.jpeg?imwidth=400',
    },
  ];

  await Category.deleteMany({});
  const category = await Category.insertMany(categories);

  const products = [
    {
      name: 'SKOGSTA',
      description: 'Dining table, 92 1/2x39 3/8 "',
      price: 3000000,
      stock: 5,
      images: [
        'https://www.ikea.com/us/en/images/products/skogsta-dining-table-acacia__0546603_pe656255_s5.jpg?f=xxs',
        'https://www.ikea.com/us/en/images/products/skogsta-dining-table-acacia__1342684_pe949087_s5.jpg?f=xxs',
      ],
      category: category[0],
    },
  ];

  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Seeding products and categories completed');
};
