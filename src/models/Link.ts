import type { ILink } from '../global.js';
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	PrimaryColumn
} from 'typeorm';

@Entity()
export class Link extends BaseEntity implements ILink {
	@PrimaryColumn('varchar')
	public id!: string;

	@Column('varchar')
	public authorId!: string;

	@Column('varchar')
	public title!: string;

	@Column('varchar')
	public url!: string;

	@Column('varchar')
	public description!: string;

	@CreateDateColumn()
	public createdAt!: Date;
}
