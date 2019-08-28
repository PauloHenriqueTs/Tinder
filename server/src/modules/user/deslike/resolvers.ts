import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { In, Not } from "typeorm";
import { PUBSUB_USER } from "../shared/constants";

export const resolvers: ResolverMap = {
  Mutation: {
    deslike: async (_, { matcheid }, { session, pubsub }) => {
      const userid = session.userId;
      if (userid) {
        let user = await User.findOne({
          where: {
            id: userid
          }
        });
        let matche = await User.findOne({
          where: {
            id: matcheid
          }
        });

        if (matche && user) {
          if (
            !matche.deslike.includes(userid) &&
            !user.deslike.includes(matche.id)
          ) {
            matche!.deslike.push(userid);
            user.deslike.push(matcheid);
            await User.save(matche);
            await User.save(user);
          }
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
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }
};
