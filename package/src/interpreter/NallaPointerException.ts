import { Token } from "../lexer/index";

export class NallaPointerException extends Error {
  public token: Token;
  constructor(token: Token, message: string) {
    super(message);
    this.token = token;
  }
}
