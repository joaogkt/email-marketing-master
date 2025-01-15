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

    //Pendente -> relação entre colunas contact-list
    @ManyToMany(() => ContactList, (contactList) => contactList.campaigns)
    @JoinTable() // Define que esta entidade será responsável pela tabela de junção
    contactLists: ContactList[];

}
