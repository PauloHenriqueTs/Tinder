import * as argon from "argon2";

import { MutationResolvers } from "../../../types";
import { User } from "../../../entity/User";
import { formatYupError } from "../../../utils/formatYupErrors";
import { validUserSchema } from "@tinder/common";

export const resolvers: MutationResolvers.Resolvers = {
  register: async (_, { input }) => {
    try {
      await validUserSchema.validate(input, { abortEarly: false });
    } catch (err) {
      return {
        errors: formatYupError(err)
      };
    }

    const { email, password } = input;

    const hashedPassword = await argon.hash(password);

    try {
      await User.create({
        email,
        password: hashedPassword
      }).save();
    } catch (err) {
      const { detail } = err;
      if (detail.includes("already exists.")) {
        if (detail.includes("email")) {
          return {
            errors: [
              {
                path: "email",
                message: "email already in use"
              }
            ]
          };
        }
      }
    }

    return {
      errors: []
    };
  }
};

export default {
  Mutation: {
    ...resolvers
  }
};
