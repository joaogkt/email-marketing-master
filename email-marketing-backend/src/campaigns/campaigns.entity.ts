import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn  } from "typeorm";

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

    //Pendente -> relação entre colunas

}
