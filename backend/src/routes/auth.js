import express from 'express';
import passport from 'passport';
import {
  loginCallback,
  getUser,
  logoutUser
} from '../controllers/authController.js';

const router = express.Router();

router.get('/login', passport.authenticate('auth0', {
  scope: 'openid email profile'
}));

router.get(
  '/callback',
  passport.authenticate('auth0', { failureRedirect: '/' }),
  loginCallback
);

router.get('/user', getUser);

router.get('/logout', logoutUser);

export default router;
