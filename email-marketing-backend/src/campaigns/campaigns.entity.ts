import { ContactList } from "src/contact-list/entities/contact-list.entity";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable  } from "typeorm";

@Entity('campaigns')
export class Campaigns { 

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToMany(() => ContactList, (contactList) => contactList.campaigns, { cascade: true } )
    @JoinTable() 
    contactLists: ContactList[];

}
