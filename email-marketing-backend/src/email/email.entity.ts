import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn  } from "typeorm";

@Entity('email')
export class Email {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100 })
    to: string;

    @Column({ length: 100 })
    subject: string

    @Column({ type: 'text', nullable: true })
    message: string

    @Column({ default: 'Pendente '})
    status: string

    @CreateDateColumn()
    createdAt: Date;
}