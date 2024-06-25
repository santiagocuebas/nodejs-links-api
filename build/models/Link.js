var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
let Link = class Link extends BaseEntity {
    id;
    authorId;
    title;
    url;
    description;
    createdAt;
};
__decorate([
    PrimaryColumn('varchar'),
    __metadata("design:type", String)
], Link.prototype, "id", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Link.prototype, "authorId", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Link.prototype, "title", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Link.prototype, "url", void 0);
__decorate([
    Column('varchar'),
    __metadata("design:type", String)
], Link.prototype, "description", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Link.prototype, "createdAt", void 0);
Link = __decorate([
    Entity()
], Link);
export { Link };
