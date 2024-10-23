export enum AuthResult {
  InvalidCredentials = "Invalid Credentials",
  UserNotFound = "User Not Found",
  UserAlreadyExists = "User Already Exists",
  EmailAlreadyExists = "Email Already Exists",
  EmailNotValid = "Email Not Valid",
  PasswordsDoNotMatch = "Passwords Do Not Match",
  PasswordTooShort = "Password Too Short, Must Be At Least 8 Characters",
  TokenExpired = "Token Expired",
  Success = "Success",
  FailedToCreateUser = "Failed To Create User",
}
