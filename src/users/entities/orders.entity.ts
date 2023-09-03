import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/products/entities/products.entity';
import { User } from './users.entity';
@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar' })
  user: User;

  @Column({ type: 'varchar' })
  email: string;

  products: Product[];
}
