import { Link } from '../models/index.js';
export const isValidTitle = async (title, { req }) => {
    const link = await Link.findOneBy({ title, authorId: req.user.id });
    if (link !== null)
        throw new Error('The title exists');
    return true;
};
export const isValidURL = async (url, { req }) => {
    const link = await Link.findOneBy({ url, authorId: req.user.id });
    if (link !== null)
        throw new Error('The url exist');
    return true;
};
export const isValidLink = async (id) => {
    const link = await Link.findOneBy({ id });
    if (link === null)
        throw new Error('The link not exist');
    return true;
};
export const isValidTitleEdit = async (title, { req }) => {
    const link = await Link.findOneBy({ title, authorId: req.user.id });
    if (link !== null && link.id !== req.params?.id) {
        throw new Error('The title exists');
    }
    return true;
};
export const isValidURLEdit = async (url, { req }) => {
    const link = await Link.findOneBy({ url, authorId: req.user.id });
    if (link !== null && link.id !== req.params?.id) {
        throw new Error('The url exist');
    }
    return true;
};
