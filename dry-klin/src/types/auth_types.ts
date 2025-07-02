//Login Type

export type ILogin = {
  username: string;
  password: string;
};

export type ILoginToken = {
  accessToken?: string;
  refreshToken?: string;
  requireTwoFa?: boolean;
};
