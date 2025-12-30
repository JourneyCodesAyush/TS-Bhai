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

import {
  Stmt,
  StmtBlock,
  StmtBreak,
  StmtContinue,
  StmtExpr,
  StmtIf,
  StmtPrint,
  StmtVar,
  StmtWhile,
} from "./Stmt/index";

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

  // parse(): Expr | null {
  //   try {
  //     return this.expression();
  //   } catch (error: ParseError | any) {
  //     this.synchronize();
  //     return null;
  //   }
  // }
  parse(): { statements: Stmt[] | null; errors: ParseError[] } {
    const statements: Stmt[] = [];
    while (!this.isAtEnd()) {
      statements.push(this.declaration());
    }

    return { statements, errors: this.errors };
  }

  statement(): Stmt {
    if (this.match(TokenType.BOL_BHAI)) {
      return this.printStatement();
    }
    if (this.match(TokenType.AGAR_BHAI)) {
      return this.ifStatement();
    }
    if (this.match(TokenType.JAB_TAK_BHAI)) {
      return this.whileStatement();
    }
    if (this.match(TokenType.BAS_KAR_BHAI)) {
      this.consume(TokenType.SEMICOLON, "Expect ';' after 'bas kar bhai'.");
      return new StmtBreak();
    }
    if (this.match(TokenType.AGLA_DEKH_BHAI)) {
      this.consume(TokenType.SEMICOLON, "Expect ';' after 'agla dekh bhai'.");
      return new StmtContinue();
    }
    if (this.match(TokenType.LEFT_CURLY_BRACE)) {
      return new StmtBlock(this.block());
    }
    return this.expressionStatement();
  }

  declaration(): Stmt {
    try {
      if (this.match(TokenType.BHAI_YE_HAI)) {
        return this.varDeclaration();
      }
      return this.statement();
    } catch (error: any) {
      if (error instanceof ParseError) {
        this.errors.push(error);
        this.synchronize();
        return new StmtBlock([]);
      }
      throw error;
    }
  }

  varDeclaration(): StmtVar {
    const name: Token = this.consume(
      TokenType.IDENTIFIER,
      "Expect variable name."
    );

    let initializer: Expr | null = null;
    if (this.match(TokenType.EQUAL)) {
      initializer = this.expression();
    }

    this.consume(TokenType.SEMICOLON, "Expect ';' after variable declaration.");
    // Initialize to null if no value
    return new StmtVar(name, initializer ?? new ExprLiteral(null));
  }

  block(): Stmt[] {
    const statements: Stmt[] = [];
    while (!this.check(TokenType.RIGHT_CURLY_BRACE) && !this.isAtEnd()) {
      statements.push(this.declaration());
    }
    this.consume(TokenType.RIGHT_CURLY_BRACE, "Expect '}' after block.");
    return statements;
  }

  printStatement(): StmtPrint {
    const expressions: Expr[] = [this.expression()];
    while (this.match(TokenType.COMMA)) {
      expressions.push(this.expression());
    }
    this.consume(TokenType.SEMICOLON, "Expect ';' after value.");
    return new StmtPrint(expressions);
  }

  ifStatement(): StmtIf {
    this.consume(TokenType.LEFT_PAREN, "Expect '(' after 'agar bhai'.");
    const condition: Expr = this.expression();
    this.consume(TokenType.RIGHT_PAREN, "Expect ')' after 'agar bhai'.");

    const thenBranch: Stmt = this.statement();

    const elseIfConditions: Expr[] = [];
    const elseIfBranches: Stmt[] = [];

    while (this.match(TokenType.NAHI_TO_BHAI)) {
      this.consume(TokenType.LEFT_PAREN, "Expect '(' after 'nahi to bhai'.");
      const elifCond: Expr = this.expression();
      this.consume(TokenType.RIGHT_PAREN, "Expect ')' after 'nahi to bhai'.");
      const elifBody: Stmt = this.statement();

      elseIfConditions.push(elifCond);
      elseIfBranches.push(elifBody);
    }

    let elseBranch: Stmt | null = null;
    if (this.match(TokenType.WARNA_BHAI)) {
      elseBranch = this.statement();
    }

    return new StmtIf(
      condition,
      thenBranch,
      elseIfConditions,
      elseIfBranches,
      elseBranch
    );
  }

  whileStatement(): StmtWhile {
    this.consume(TokenType.LEFT_PAREN, "Expect '(' after 'jab tak bhai'.");
    const condition: Expr = this.expression();
    this.consume(TokenType.RIGHT_PAREN, "Expect ')' after 'jab tak bhai'.");
    const body: Stmt = this.statement();

    return new StmtWhile(condition, body);
  }

  expressionStatement(): StmtExpr {
    const expr: Expr = this.expression();
    this.consume(TokenType.SEMICOLON, "Expect ';' after expression.");
    return new StmtExpr(expr);
  }

  error(token: Token, message: string): ParseError {
    // const err: ParseError = new ParseError(token, message);
    // this.errors.push(err);
    return new ParseError(token, message);
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
    if (this.match(TokenType.NUMBER)) {
      return new ExprLiteral(Number(this.previous().getLiteral()));
    }
    if (this.match(TokenType.STRING)) {
      return new ExprLiteral(this.previous().getLiteral());
    }
    if (this.match(TokenType.SAHI)) {
      return new ExprLiteral(true);
    }
    if (this.match(TokenType.GALAT)) {
      return new ExprLiteral(false);
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
        case TokenType.IDENTIFIER:
          return;
        default:
      }
      this.advance();
    }
  }
}
