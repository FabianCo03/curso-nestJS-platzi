import { Product } from 'src/products/entities/products.entities';
import { User } from './users.entities';
export class Order {
  date: Date;
  user: User;
  products: Product[];
}
