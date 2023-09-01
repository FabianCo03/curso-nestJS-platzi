import { Column, Entity } from 'typeorm';
import { Product } from 'src/products/entities/products.entity';
import { User } from './users.entity';
@Entity()
export class Order {
  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar' })
  user: User;

  @Column({ type: 'varchar' })
  email: string;

  products: Product[];
}
