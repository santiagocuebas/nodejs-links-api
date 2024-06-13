import type { IKeys } from '../global.js';
import { Router } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { GITHUB_URL, SECRET } from '../config.js';
import { getId } from '../libs/index.js';
import { isLoggedIn, isNotLoggedIn } from '../middlewares/logged.js';
import { User } from '../models/index.js';

const router = Router();

router.get(
  '/',
  isLoggedIn,
  async (req, res) => {
    const token = req.headers.authorization;

    return res.json({ user: req.user, token });
  }
);

router.post(
  '/register',
  isNotLoggedIn,
  async (req, res) => {
    try {
      const params = GITHUB_URL + `${req.headers['Authorization']}`;
    
      const data: IKeys<string> = await axios({
        method: 'POST',
        url: 'https://github.com/login/oauth/access_token?' + params,
        headers: { accept: 'application/json' }
      }).then(res => res.data);
      
      const githubData: IKeys<string> = await axios({
        method: 'GET',
        url: 'https://api.github.com/user',
        headers: { 'Authorization': `${data.token_type} ${data.access_token}` }
      }).then(res => res.data);
      
      // Find user
      let user = await User.findOneBy({ githubId: githubData.id });
    
      // Create user
      if (user === null) {
        user = await User.create({
          id: await getId('User'),
          githubId: githubData.id,
          username: githubData.login
        }).save();
      }
    
      // Generate token
      const token = jwt.sign({
        id: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15
      }, SECRET);
        
      return res.json({ user, token });
    } catch {
      return res.status(401).json({
        error: 'An error occurred while trying to register the user'
      });
    }
  }
);

export default router;
