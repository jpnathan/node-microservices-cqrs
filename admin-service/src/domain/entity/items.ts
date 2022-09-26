import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export default class Item extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    imageUrl: string;

    @Column({ default: 0 })
    totalItems: number;

    @CreateDateColumn({ name: "createdAt", type: "datetime" })
    createdAt: Date;
}