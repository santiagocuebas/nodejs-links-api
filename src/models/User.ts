import type { IUser } from '../global.js';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn
} from 'typeorm';

@Entity()
export class User extends BaseEntity implements IUser {
	@PrimaryColumn('varchar')
	public id!: string;

	@Column('varchar')
	public username!: string;

	@Column('varchar', { nullable: false })
	public email!: string;

	@Column({ nullable: true })
	public githubId!: number;

	@Column('varchar', { nullable: true })
	public googleId!: string;

	@CreateDateColumn()
	public createdAt!: Date;
}
