import { Token, TokenType } from "../lexer/index";

import {
  Expr,
  ExprAssign,
  ExprBinary,
  ExprGrouping,
  ExprLiteral,
  ExprUnary,
  ExprVariable,
} from "./Expr/index";

export class ParseError extends Error {
  public token: Token;
  constructor(token: Token, message: string) {
    super(message);
    this.token = token;
  }
}

export class Parser {
  private _tokens: Token[];
  private _current: number = 0;
  public errors: ParseError[] = [];

  constructor(tokens: Token[]) {
    this._tokens = tokens;
  }

  parse(): Expr | null {
    try {
      return this.expression();
    } catch (error: ParseError | any) {
      this.synchronize();
      return null;
    }
  }

  error(token: Token, message: string): ParseError {
    const err: ParseError = new ParseError(token, message);
    this.errors.push(err);
    return err;
  }

  isAtEnd(): boolean {
    return this.peek().getType() === TokenType.EOF;
  }

  peek(): Token {
    return this._tokens[this._current];
  }

  check(token: TokenType): boolean {
    if (this.isAtEnd()) {
      return false;
    }
    return this.peek().getType() === token;
  }

  previous(): Token {
    return this._tokens[this._current - 1];
  }

  advance(): Token {
    if (!this.isAtEnd()) {
      this._current++;
    }
    return this.previous();
  }

  match(...tokenTypes: TokenType[]): boolean {
    for (const tokenType of tokenTypes) {
      if (this.check(tokenType)) {
        this.advance();
        return true;
      }
    }
    return false;
  }

  consume(type: TokenType, message: string): Token {
    if (this.check(type)) {
      return this.advance();
    }
    throw this.error(this.peek(), message);
  }

  expression(): Expr {
    return this.assignment();
  }

  assignment(): Expr {
    const expr = this.equality();

    if (this.match(TokenType.EQUAL)) {
      const equals: Token = this.previous();
      const value: Expr = this.assignment();

      if (expr instanceof ExprVariable) {
        return new ExprAssign(expr.name, value);
      }
      throw this.error(equals, "Invalid assignment target.");
    }
    return expr;
  }

  equality(): Expr {
    let expr = this.comparison();

    while (this.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
      const operator: Token = this.previous();
      const right: Expr = this.comparison();
      expr = new ExprBinary(expr, operator, right);
    }
    return expr;
  }

  comparison(): Expr {
    let expr: Expr = this.term();
    while (
      this.match(
        TokenType.GREATER,
        TokenType.GREATER_EQUAL,
        TokenType.LESS,
        TokenType.LESS_EQUAL
      )
    ) {
      const operator: Token = this.previous();
      const right: Expr = this.term();
      expr = new ExprBinary(expr, operator, right);
    }

    return expr;
  }

  term(): Expr {
    let expr: Expr = this.factor();

    while (this.match(TokenType.PLUS, TokenType.MINUS)) {
      const operator: Token = this.previous();
      const right: Expr = this.factor();
      expr = new ExprBinary(expr, operator, right);
    }

    return expr;
  }

  factor(): Expr {
    let expr: Expr = this.unary();

    while (this.match(TokenType.STAR, TokenType.SLASH)) {
      const operator: Token = this.previous();
      const right: Expr = this.unary();
      expr = new ExprBinary(expr, operator, right);
    }

    return expr;
  }

  unary(): Expr {
    if (this.match(TokenType.BANG, TokenType.MINUS)) {
      const operator: Token = this.previous();
      const right: Expr = this.unary();
      return new ExprUnary(operator, right);
    }
    return this.primary();
  }

  primary(): Expr {
    if (this.match(TokenType.NUMBER, TokenType.STRING)) {
      return new ExprLiteral(this.previous().getLiteral());
    }
    if (this.match(TokenType.SAHI)) {
      return new ExprLiteral(this.previous().getLiteral());
    }
    if (this.match(TokenType.GALAT)) {
      return new ExprLiteral(this.previous().getLiteral());
    }

    if (this.match(TokenType.IDENTIFIER)) {
      return new ExprVariable(this.previous());
    }
    if (this.match(TokenType.LEFT_PAREN)) {
      const expr = this.expression();
      this.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression.");
      return new ExprGrouping(expr);
    }
    throw this.error(this.peek(), "Expect expression.");
  }

  // Used once statement parsing is introduced.
  // Currently not heavily exercised during expression-only parsing.
  synchronize(): void {
    this.advance();

    while (!this.isAtEnd()) {
      if (this.previous().getType() == TokenType.SEMICOLON) {
        return;
      }

      switch (this.peek().getType()) {
        case TokenType.BHAI_YE_HAI:
        case TokenType.AGAR_BHAI:
        case TokenType.NAHI_TO_BHAI:
        case TokenType.WARNA_BHAI:
        case TokenType.JAB_TAK_BHAI:
        case TokenType.BOL_BHAI:
        case TokenType.BAS_KAR_BHAI:
        case TokenType.AGLA_DEKH_BHAI:
          return;
        default:
      }
      this.advance();
    }
  }
}
