import passport from 'passport';
import { Strategy as Auth0Strategy } from 'passport-auth0';
import dotenv from 'dotenv';
import User from './src/models/User.js';

dotenv.config();

passport.use(
  new Auth0Strategy(
    {
      domain: process.env.AUTH0_DOMAIN,
      clientID: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/callback',
    },
    async (accessToken, refreshToken, extraParams, profile, done) => {
      try {
        let user = await User.findOne({ auth0Id: profile.id });

        if (!user) {
          const email = profile.emails?.[0]?.value || '';
          const picture = profile.photos?.[0]?.value || '';
          const name = profile.displayName || profile.name || '';

          user = new User({
            auth0Id: profile.id,
            email,
            name,
            picture,
            password: '', // ✅ Add empty password since Auth0 doesn’t give one
          });

          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
