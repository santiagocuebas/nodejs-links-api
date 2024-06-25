import axios from 'axios';
import jwt from 'jsonwebtoken';
import { GITHUB_URI, GOOGLE_URI } from '../config.js';
import { findOrCreateUser } from '../libs/index.js';
export const postGoogle = async (req, res) => {
    try {
        const data = await axios({
            method: 'POST',
            url: GOOGLE_URI + `${req.query.code}`
        }).then(res => res.data);
        const decodedToken = jwt.decode(data.id_token, { json: true });
        if (decodedToken === null)
            throw undefined;
        const patchedData = {
            googleId: `${decodedToken.sub}`,
            username: decodedToken.email.split('@')[0],
            email: decodedToken.email
        };
        const resData = await findOrCreateUser(patchedData, { googleId: decodedToken.sub });
        return res.json(resData);
    }
    catch {
        return res.status(401).json({
            error: 'An error occurred while trying to register the user'
        });
    }
};
export const postGithub = async (req, res) => {
    try {
        const data = await axios({
            method: 'POST',
            url: GITHUB_URI + `${req.query.code}`,
            headers: { Accept: 'application/json' }
        }).then(res => res.data);
        axios.defaults.headers.common.Authorization = `${data.token_type} ${data.access_token}`;
        const githubData = await axios({
            url: 'https://api.github.com/user'
        }).then(res => res.data);
        if (githubData.email === null) {
            const emailData = await axios({
                url: 'https://api.github.com/user/emails'
            }).then(res => res.data);
            const primaryEmail = emailData.find(email => email.primary === true);
            if (!primaryEmail)
                throw undefined;
            githubData.email = primaryEmail.email;
        }
        const patchedData = {
            githubId: githubData.id,
            username: githubData.login,
            email: githubData.email
        };
        const resData = await findOrCreateUser(patchedData, { githubId: githubData.id });
        return res.json(resData);
    }
    catch {
        return res.status(401).json({
            error: 'An error occurred while trying to register the user'
        });
    }
};
