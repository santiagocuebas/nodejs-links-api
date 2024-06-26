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

	@Column('varchar', { unique: true })
	public email!: string;

	@Column('varchar')
	public password!: string;

	@CreateDateColumn()
	public createdAt!: Date;
}
