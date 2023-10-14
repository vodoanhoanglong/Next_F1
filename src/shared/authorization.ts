export enum AuthorizationCode {
  AccessDenied = "access-denied",
}

export const AuthorizationMessage = {
  [AuthorizationCode.AccessDenied]: "Phiên đăng nhập hết hạn",
};
