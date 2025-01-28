import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProducts } from './products.interface';

@Injectable()
export class ProductsService {
  private products: IProducts[] = [
    {
      id: 1,
      name: 'ball',
      price: 120,
      category: 'sport',
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      name: 'book',
      price: 30,
      category: 'education',
      createdAt: new Date().toISOString(),
    },
  ];

  create(createProductDto: CreateProductDto) {
    const lastId = this.products[this.products.length - 1].id || 0;

    const newProduct = {
      id: lastId + 1,
      name: createProductDto.name,
      price: createProductDto.price,
      category: createProductDto.category,
      createdAt: new Date().toISOString(),
    };
    this.products.push(newProduct);
    return `new product ${newProduct}`;
  }

  findAll(query, lang): IProducts[] {
    interface iResource {
      ka: IProducts[];
      en: IProducts[];
    }

    const resourceLang: iResource = {
      ka: [
        {
          id: 1,
          name: 'ბურთი',
          price: 120,
          category: 'სპორტი',
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'წიგნი',
          price: 30,
          category: 'განათლება',
          createdAt: new Date().toISOString(),
        },
      ],
      en: [...this.products],
    };

    const showProducts = lang
      ? lang.toLocaleLowerCase() === 'ka'
        ? resourceLang.ka
        : resourceLang.en
      : resourceLang.en;

    const { category, price } = query;

    if (category && price) {
      const products = showProducts.filter((p) => p.category === category);
      const result = products.filter((p) => p.price >= price);
      if (result.length < 1) throw new NotFoundException(' products not found');
      return result;
    }

    if (category) {
      const products = showProducts.filter((p) => p.category === category);
      if (products.length <= 0)
        throw new NotFoundException('product not found');
      return products;
    }
    if (price) {
      const products = showProducts.filter((p) => p.price > price);
      if (products.length <= 0)
        throw new NotFoundException('product not found');
      return products;
    }

    const products = showProducts;
    if (products.length <= 0) throw new Error('Products not found');
    return showProducts;
  }

  findOne(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) throw new NotFoundException('product not found');
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const findIndex = this.products.findIndex((p) => p.id === id);
    if (findIndex === -1) throw new NotFoundException('product not found');
    if (updateProductDto.category)
      this.products[findIndex].category = updateProductDto.category;
    if (updateProductDto.name)
      this.products[findIndex].name = updateProductDto.name;
    if (updateProductDto.price)
      this.products[findIndex].price = updateProductDto.price;
    return this.products[findIndex];
  }

  async remove(id: number) {
    const findIndex = this.products.findIndex((p) => p.id === id);
    if (findIndex === -1) throw new NotFoundException('product not found');
    const deletedProduct = this.products.splice(findIndex, 1);
    return `delete successfully ${deletedProduct} `;
  }
}
