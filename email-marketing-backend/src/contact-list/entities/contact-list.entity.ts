import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Company } from 'src/company/company.entity';

@Entity('contact-lists')
export class ContactList {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100})
    name: string

    @ManyToOne(() => Company, (company) => company.id)
    company: Company;
  
    @CreateDateColumn()
    data_cadastro: Date;
}
