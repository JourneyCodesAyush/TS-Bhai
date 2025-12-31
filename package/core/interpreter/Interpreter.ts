import type { Visitor } from "../parser/Expr/index";
import {
  Expr,
  ExprAssign,
  ExprBinary,
  ExprGrouping,
  ExprLiteral,
  ExprUnary,
  ExprVariable,
} from "../parser/Expr/index";

import {
  Stmt,
  StmtBlock,
  StmtExpr,
  StmtIf,
  StmtPrint,
  StmtVar,
  StmtWhile,
  StmtBreak,
  StmtContinue,
} from "../parser/Stmt/index";
import type { StmtVisitor } from "../parser/Stmt/index";

import { Token, TokenType } from "../lexer/index";
import type { Value } from "./Value";
import { Environment } from "./Environment";
import { RuntimeError } from "./RuntimeError";
import { NallaPointerException } from "./NallaPointerException";

export class BreakSignal extends Error {}
export class ContinueSignal extends Error {}

export class Interpreter
  implements Visitor<Value | undefined>, StmtVisitor<void>
{
  private _environment: Environment = new Environment();
  public InterpreterErrors: RuntimeError[] = [];

  public output: string[] = [];

  interpretExpr(expr: Expr): Value | undefined {
    try {
      return this.evaluate(expr);
    } catch (error: unknown) {
      if (error instanceof RuntimeError) {
        this.InterpreterErrors.push(error);
      } else if (error instanceof NallaPointerException) {
        console.log("NallaPointerException");
        this.InterpreterErrors.push(error);
      } else {
        // wrap unknown errors as RuntimeError
        this.InterpreterErrors.push(
          new RuntimeError(
            {
              getLexeme: () => "<unknown>",
              getType: () => TokenType.PLUS,
            } as Token,
            String(error)
          )
        );
      }
      return undefined;
    }
  }

  interpret(statements: Stmt[]): string[] | undefined {
    try {
      for (const statement of statements) {
        this.execute(statement);
      }
      return this.output;
    } catch (error) {
      if (
        error instanceof RuntimeError ||
        error instanceof NallaPointerException
      ) {
        this.InterpreterErrors.push(error);
      } else {
        // wrap unknown errors as RuntimeError
        this.InterpreterErrors.push(
          new RuntimeError(
            {
              getLexeme: () => "<unknown>",
              getType: () => TokenType.PLUS,
            } as Token,
            String(error)
          )
        );
      }
      return undefined;
    }
  }

  execute(stmt: Stmt) {
    return stmt.accept(this);
  }

  private evaluate(expr: Expr): Value {
    return expr.accept(this) as Value;
  }

  visitExpressionStmt(node: StmtExpr): void {
    this.evaluate(node.expression);
  }

  visitIfStmt(node: StmtIf): void {
    if (this.isTruthy(this.evaluate(node.condition))) {
      this.execute(node.thenBranch);
      return;
    }
    for (let i = 0; i < node.elseIfConditions.length; i++) {
      if (this.isTruthy(this.evaluate(node.elseIfConditions[i]))) {
        this.execute(node.elseIfBranches[i]);
        return;
      }
    }
    if (node.elseBranch !== null) {
      this.execute(node.elseBranch);
      return;
    }
  }

  visitPrintStmt(node: StmtPrint): void {
    // if (node.expressions.length === 1) {
    //   const value: Value = this.evaluate(node.expressions[0]);
    //   // console.log(this.stringify(value));
    //   console.log(value, typeof value);
    //   this.output.push(this.stringify(value));
    // } else {
    //   for (const expression of node.expressions) {
    //     const value: Value = this.evaluate(expression);
    //     // console.log(this.stringify(value));
    //     this.output.push(this.stringify(value));
    //   }
    // }

    // const line = node.expressions
    //   .map((expr) => this.stringify(this.evaluate(expr)))
    //   .join(" ");
    const evaluated = node.expressions.map((expr) => this.evaluate(expr));
    console.log("PRINT DEBUG: ", evaluated);
    const line = evaluated.map((v) => this.stringify(v)).join(" ");
    this.output.push(line);
  }

  visitVarStmt(node: StmtVar): void {
    let value: Value = null;
    if (node.initializer !== null) {
      value = this.evaluate(node.initializer);
    }
    this._environment.define(node.name.getLexeme(), value);
  }

  visitWhileStmt(node: StmtWhile): void {
    while (this.isTruthy(this.evaluate(node.condition))) {
      try {
        this.execute(node.body);
      } catch (error) {
        if (error instanceof ContinueSignal) {
          continue;
        }
        if (error instanceof BreakSignal) {
          break;
        }
      }
    }
  }

  visitBreakStmt(_: StmtBreak): void {
    throw new BreakSignal();
  }

  visitContinueStmt(_: StmtContinue): void {
    throw new ContinueSignal();
  }

  visitBlockStmt(node: StmtBlock): void {
    this.executeBlock(node.statements, this._environment);
  }

  executeBlock(statements: Stmt[], environment: Environment): void {
    const previous: Environment = this._environment;
    try {
      this._environment = environment;
      for (const statement of statements) {
        this.execute(statement);
      }
    } finally {
      this._environment = previous;
    }
  }

  visitLiteralExpr(expr: ExprLiteral): Value {
    return expr.value;
  }

  visitGroupingExpr(expr: ExprGrouping): Value {
    return this.evaluate(expr.expression);
  }

  visitUnaryExpr(expr: ExprUnary): Value | undefined {
    const right = this.evaluate(expr.right);

    switch (expr.operator.getType()) {
      case TokenType.MINUS:
        this.assertNumber(right, expr.operator);
        return -right;
      case TokenType.BANG:
        return !this.isTruthy(right);
    }
    return undefined;
  }

  visitBinaryExpr(expr: ExprBinary): Value | undefined {
    const left = this.evaluate(expr.left);
    const right = this.evaluate(expr.right);
    this.assertNotNalla(left, expr.operator);
    this.assertNotNalla(right, expr.operator);

    switch (expr.operator.getType()) {
      case TokenType.PLUS:
        if (typeof left === "string" || typeof right === "string") {
          return String(left) + String(right);
        }
        if (
          (typeof left === "string" && typeof right === "number") ||
          (typeof left === "number" && typeof right === "string")
        ) {
          return `${left}${right}`;
        }
        this.assertNumber(left, expr.operator);
        this.assertNumber(right, expr.operator);
        return left + right;
      case TokenType.MINUS:
        this.assertNumber(left, expr.operator);
        this.assertNumber(right, expr.operator);
        return left - right;
      case TokenType.STAR:
        this.assertNumber(left, expr.operator);
        this.assertNumber(right, expr.operator);
        return left * right;
      case TokenType.SLASH:
        this.assertNumber(left, expr.operator);
        this.assertNumber(right, expr.operator);
        return left / right;
      case TokenType.EQUAL_EQUAL:
        return this.isEqual(left, right);
      case TokenType.BANG_EQUAL:
        return !this.isEqual(left, right);
      case TokenType.GREATER:
        this.assertNumber(left, expr.operator);
        this.assertNumber(right, expr.operator);
        return left > right;
      case TokenType.GREATER_EQUAL:
        this.assertNumber(left, expr.operator);
        this.assertNumber(right, expr.operator);
        return left >= right;
      case TokenType.LESS:
        this.assertNumber(left, expr.operator);
        this.assertNumber(right, expr.operator);
        return left < right;
      case TokenType.LESS_EQUAL:
        this.assertNumber(left, expr.operator);
        this.assertNumber(right, expr.operator);
        return left <= right;
    }
    return undefined;
  }

  visitVariableExpr(expr: ExprVariable): Value {
    try {
      return this._environment.get(expr.name);
    } catch (error) {
      throw new RuntimeError(
        expr.name,
        `Undefined variable '${expr.name.getLexeme()}'`
      );
    }
  }

  visitAssignExpr(expr: ExprAssign): Value {
    const value = this.evaluate(expr.value);
    this._environment.assign(expr.name, value);
    return value;
  }

  private assertNumber(value: Value, token: Token): asserts value is number {
    if (typeof value !== "number") {
      throw new RuntimeError(token, "Operand must be a number.");
    } else if (value === null) {
      throw new NallaPointerException(
        token,
        "Operations on nalla pointer are NOT allowed"
      );
    }
  }

  private assertNotNalla(value: Value, token: Token): void {
    if (value === null) {
      throw new NallaPointerException(
        token,
        `Cannot use 'nalla' at '${token.getLexeme()}'`
      );
    }
  }

  private isTruthy(value: Value): boolean {
    if (value === null || value === false || value === 0) return false;
    return true;
  }

  private isEqual(a: Value, b: Value): boolean {
    return a === b;
  }

  stringify(value: Value): string {
    if (value === null) return "nalla";
    if (value === true) {
      return "sahi";
    }
    if (value === false) {
      return "galat";
    }
    return String(value);
  }
}
