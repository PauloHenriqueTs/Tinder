import { Ctx, Mutation, Query, Resolver, Arg } from "type-graphql";
import { MyContext } from "../../types/Context";
import { Matches } from "../../entity/Matches";
import { User } from "../../entity/User";
import { In } from "typeorm";

@Resolver(User)
export class UserResolver {
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
  @Mutation(() => String, { nullable: true })
  async like(
    @Arg("first_like_userid") first_like_userid: string,
    @Arg("last_like_userid") last_like_userid: string
  ): Promise<Boolean> {
    const TheyGiveMatche = await Matches.find({
      where: {
        first_like_userid: In([first_like_userid, last_like_userid]),
        last_like_userid: In([first_like_userid, last_like_userid])
      }
    });
    if (!TheyGiveMatche) {
      await Matches.create({
        first_like_userid,
        last_like_userid
      }).save();
      return true;
    } else {
      return false;
    }
  }
}
