import { Ctx, Mutation, Query, Resolver, Arg } from "type-graphql";
import { MyContext } from "../../types/Context";
import { Matches } from "../../entity/Matches";
import { User } from "../../entity/User";
import { In } from "typeorm";

@Resolver(User)
export class UserResolver {
  @Query(() => String)
  async hello() {
    return "Hello World!";
  }
  @Mutation(() => Boolean)
  async logout(
    @Ctx()
    ctx: MyContext
  ): Promise<{}> {
    return new Promise(res => {
      ctx.req.session
        ? ctx.req.session.destroy((err: any) => {
            res(!!err);
          })
        : res(true);
    });
  }

  @Query(() => User, { nullable: true })
  async me(
    @Ctx()
    ctx: MyContext
  ): Promise<User | null | undefined> {
    const { userId = "" } = ctx.req.session || {};
    return userId ? User.findOne(userId) : null;
  }
  @Mutation(() => User)
  async register(
    @Arg("email") email: string,
    @Arg("name") name: string
  ): Promise<User> {
    const user = await User.create({
      email,
      name
    }).save();

    return user;
  }
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg("email") email: string,
    @Ctx() ctx: MyContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    ctx.req.session!.userId = user.id;
    return user;
  }

  @Query(() => [User], { nullable: true })
  async find(): Promise<User[]> {
    return User.find({});
  }
  @Mutation(() => Boolean)
  async like(
    @Arg("userid") userid: string,
    @Arg("matcheid") matcheid: string
  ): Promise<Boolean> {
    //const userid1 = ctx.req.session!.userId;
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
        console.log(matche.like);
        if (!matche.like.includes(userid)) {
          matche!.like.push(userid);
          await User.save(matche);
        }

        if (user!.like.includes(matcheid)) {
          const TheyGiveMatche = await Matches.find({
            where: {
              first_like_userid: In([userid, matcheid]),
              last_like_userid: In([userid, matcheid])
            }
          });
          if (!TheyGiveMatche) {
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
  }
  @Mutation(() => Boolean)
  async deslike(
    @Arg("userid") userid: string,
    @Arg("matcheid") matcheid: string
  ): Promise<Boolean> {
    //const userid1 = ctx.req.session!.userId;
    const TheyGiveMatche = await Matches.find({
      where: {
        first_like_userid: In([userid, matcheid]),
        last_like_userid: In([userid, matcheid])
      }
    });
    if (!TheyGiveMatche) {
      return false;
    } else {
      let matche = await User.findOne({
        where: {
          id: matcheid
        }
      });
      if (!matche!.like.includes(userid)) {
        matche!.like.push(userid);
        await User.save(matche!);
        return true;
      }
      return false;
    }
  }
}
