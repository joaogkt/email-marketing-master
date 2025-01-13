import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('empresas')
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @OneToMany(() => User, (user) => user.company)
  users: User[];

  @CreateDateColumn()
  data_cadastro: Date;

  @Column({ length: 255, nullable: true })
  dominio: string | null;
}
