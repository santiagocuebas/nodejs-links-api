import jwt from 'jsonwebtoken';
import { getId } from './get-id.js';
import { SECRET } from '../config.js';
import { User } from '../models/index.js';
export const findOrCreateUser = async (data, findQuery) => {
    let user = await User.findOneBy(findQuery);
    if (user === null) {
        user = await User
            .create({ id: await getId('User'), ...data })
            .save();
    }
    const token = jwt.sign({
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15
    }, SECRET);
    return { user, token };
};
