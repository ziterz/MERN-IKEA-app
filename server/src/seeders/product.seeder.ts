import { Category } from '../models/Category.model';
import { Product } from '../models/Product.model';

export const productSeeder = async () => {
  try {
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
        name: 'MALM',
        description: 'Bed frame, Queen',
        price: 3500000,
        stock: 70,
        images: [
          'https://www.ikea.com/us/en/images/products/malm-bed-frame-black-brown-luroey__0638608_pe699032_s5.jpg?f=xxs',
          'https://www.ikea.com/us/en/images/products/malm-bed-frame-black-brown-luroey__1101514_pe866693_s5.jpg?f=xxs',
        ],
        category: category[0],
      },
      {
        name: 'KLIPPAN',
        description: 'Loveseat',
        price: 4000000,
        stock: 40,
        images: [
          'https://www.ikea.com/us/en/images/products/klippan-loveseat-bomstad-black__0562963_pe663653_s5.jpg?f=xxs',
          'https://www.ikea.com/us/en/images/products/klippan-loveseat-bomstad-black__0827136_pe709127_s5.jpg?f=xxs',
        ],
        category: category[0],
      },
      {
        name: 'DRÖNA',
        description: 'Box, 13x15x13 "',
        price: 60000,
        stock: 120,
        images: [
          'https://www.ikea.com/us/en/images/products/droena-box-black__0713065_pe729169_s5.jpg?f=xxs',
          'https://www.ikea.com/us/en/images/products/droena-box-black__1249495_pe923368_s5.jpg?f=xxs',
        ],
        category: category[1],
      },
      {
        name: 'TJUSIG',
        description: 'Shoe rack, 31 1/8x12 5/8x14 5/8 "',
        price: 350000,
        stock: 90,
        images: [
          'https://www.ikea.com/us/en/images/products/tjusig-shoe-rack-black__0710715_pe727750_s5.jpg?f=xxs',
          'https://www.ikea.com/us/en/images/products/tjusig-shoe-rack-black__0391727_pe559948_s5.jpg?f=xxs',
        ],
        category: category[1],
      },
    ];

    await Product.deleteMany({});
    await Product.insertMany(products);
  } catch (err) {
    console.log(err);
  }
};
