// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation | ISubscription;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
messages: Array<IMessage>;
me: IUser | null;
}

interface IMessagesOnQueryArguments {
matcheid: string;
}

interface IMessage {
__typename: "Message";
matcheId: string;
dateString: string;
text: string;
userId: string;
}

interface IUser {
__typename: "User";
id: string;
email: string;
}

interface IMutation {
__typename: "Mutation";
createMessage: boolean;
deslike: boolean;
sendForgotPasswordEmail: boolean | null;
forgotPasswordChange: Array<IError>;
like: boolean;
login: ILoginResponse;
logout: boolean | null;
pickuser: boolean;
register: Array<IError>;
}

interface ICreateMessageOnMutationArguments {
message: IMessageInput;
}

interface IDeslikeOnMutationArguments {
matcheid: string;
}

interface ISendForgotPasswordEmailOnMutationArguments {
email: string;
}

interface IForgotPasswordChangeOnMutationArguments {
newPassword: string;
key: string;
}

interface ILikeOnMutationArguments {
matcheid: string;
}

interface ILoginOnMutationArguments {
email: string;
password: string;
}

interface IRegisterOnMutationArguments {
email: string;
password: string;
name: string;
}

interface IMessageInput {
text: string;
matcheId: string;
}

interface IError {
__typename: "Error";
path: string;
message: string;
}

interface ILoginResponse {
__typename: "LoginResponse";
errors: Array<IError>;
sessionId: string | null;
}

interface ISubscription {
__typename: "Subscription";
newMessage: IMessage;
finduser: IUser | null;
}

interface INewMessageOnSubscriptionArguments {
matcheid: string;
}
}

// tslint:enable
