import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { In, Not } from "typeorm";
import { PUBSUB_USER } from "../shared/constants";

export const resolvers: ResolverMap = {
  Mutation: {
    pickuser: async (_, __, { session, pubsub }) => {
      const userid = session.userId;
      if (userid) {
        const user = await User.findOne({
          where: {
            id: userid
          }
        });

        if (user) {
          const test = user.like.concat(userid).concat(user.deslike);
          const likenotifyuser = await User.findOne({
            where: {
              id: Not(In(test))
            }
          });

          if (likenotifyuser) {
            pubsub.publish(PUBSUB_USER, {
              finduser: likenotifyuser
            });
          } else {
            pubsub.publish(PUBSUB_USER, {
              finduser: null
            });
          }

          return true;
        }
      }
      return false;
    }
  }
};
