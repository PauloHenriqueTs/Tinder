import { Strategy } from "passport-facebook";
import * as typeorm from "typeorm";
import { User } from "../../entity/User";
import passport = require("passport");

export const FacebookStrategy = new Strategy(
  {
    clientID: process.env.FACEBOOK_ID || "",
    clientSecret: process.env.FACEBOOK_SECRET || "",
    callbackURL: `${process.env.BACKEND_HOST}/oauth/facebook`,
    profileFields: [
      "displayName",
      "name",
      "gender",
      "picture.width(800).height(600)",
      "emails"
    ]
  },
  async (accessToken, refreshToken, userProfile, cb) => {
    const profile = userProfile;

    const { email, name, picture, id } = profile._json;
    if (profile._json) {
      let user = await typeorm
        .getRepository(User)
        .findOne({ where: { email } });

      if (!user) {
        user = await User.create({
          email,
          name,
          pictureUrl: picture.data.url,
          confirmed: true,
          forgotPasswordLocked: true,
          password: id
        }).save();
      }

      cb(null, {
        user,
        accessToken,
        refreshToken
      });
    }
  }
);

export const FacebookAuth = passport.authenticate("facebook", {
  session: false
});

export const FacebookRedirectAuth = (req: any, res: any) => {
  if (req.user.user.id && req.session) {
    req.session.userId = req.user.user.id;
    req.session.accessToken = req.user.accessToken;
    req.session.refreshToken = req.user.refreshToken;
  }
  res.redirect(`${process.env.FRONTEND_HOST}/matches`);
};
