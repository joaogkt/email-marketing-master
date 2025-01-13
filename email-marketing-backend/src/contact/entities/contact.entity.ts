import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { ContactList } from 'src/contact-list/entities/contact-list.entity';

@Entity('contacts')
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;


  @ManyToMany(() => ContactList, (contactList) => contactList.contacts, {cascade: true,})
  @JoinTable({
    name: 'contact_list_contacts',
    joinColumn: { name: 'contact_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'list_id', referencedColumnName: 'id' },
  })
  contactLists: ContactList[];
}