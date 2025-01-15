import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Company } from 'src/company/company.entity';
import { Contact } from 'src/contact/entities/contact.entity';
import { Campaigns } from 'src/campaigns/campaigns.entity';

@Entity('contact-lists')
export class ContactList {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ length: 100})
    nome: string

    @ManyToOne(() => Company, (company) => company.id)
    company: Company;
  
    @CreateDateColumn()
    data_cadastro: Date;

    @ManyToMany(() => Contact, (contact) => contact.contactLists)
    contacts: Contact[];

    @ManyToMany(() => Campaigns, (campaign) => campaign.contactLists)
    campaigns: Campaigns[];
}
