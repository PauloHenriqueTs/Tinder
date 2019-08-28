import { ResolverMap } from "../../../types/graphql-utils";
import { User } from "../../../entity/User";
import { Matches } from "../../../entity/Matches";
import { In, Not } from "typeorm";
import { PUBSUB_USER } from "../shared/constants";

export const resolvers: ResolverMap = {
  Mutation: {
    like: async (
      _,
      { matcheid }: GQL.ILikeOnMutationArguments,
      { session, pubsub }
    ) => {
      const userid = session.userId;
      if (userid) {
        const OneofUsersGiveDeslike = await User.find({
          where: {
            deslike: In([userid, matcheid])
          }
        });

        if (!OneofUsersGiveDeslike[0] === undefined) {
          return false;
        } else {
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
            if (!user.like.includes(matcheid)) {
              user!.like.push(matcheid);
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

            if (matche.like.includes(userid)) {
              const TheyGiveMatche = await Matches.find({
                join: {
                  alias: "matches"
                },
                where: {
                  first_like_userid: In([userid, matcheid]),
                  last_like_userid: In([userid, matcheid])
                }
              });
              if (!TheyGiveMatche[0]) {
                await Matches.create({
                  first_like_userid: userid,
                  last_like_userid: matcheid
                }).save();
                return true;
              } else {
                return true;
              }
            } else {
              return false;
            }
          } else {
            return false;
          }
        }
      } else {
        return false;
      }
    }
  }
};
