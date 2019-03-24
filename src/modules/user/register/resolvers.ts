import * as argon from "argon2";
import * as yup from "yup";

import { MutationResolvers } from "../../../types";
import { User } from "../../../entity/User";
import { formatYupError } from "../../../utils/formatYupErrors";

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .min(3)
    .max(500)
    .required(),
  password: yup
    .string()
    .min(5)
    .max(1000)
    .required()
});

export const resolvers: MutationResolvers.Resolvers = {
  register: async (_, { input }) => {
    try {
      await registerSchema.validate(input, { abortEarly: false });
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
      console.log(err);
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
