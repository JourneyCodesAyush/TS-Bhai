import { Visitor } from "../parser/Expr/index";
import {
  Expr,
  ExprAssign,
  ExprBinary,
  ExprGrouping,
  ExprLiteral,
  ExprUnary,
  ExprVariable,
} from "../parser/Expr/index";
import { Token, TokenType } from "../lexer/index";
import { Value } from "./Value";
import { Environment } from "./Environment";
import { RuntimeError } from "./RuntimeError";

export class Interpreter implements Visitor<Value | undefined> {
  private _environment: Environment = new Environment();
  public InterpreterErrors: RuntimeError[] = [];

  interpret(expr: Expr): Value | undefined {
    try {
      return this.evaluate(expr);
    } catch (error: unknown) {
      if (error instanceof RuntimeError) {
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

  private evaluate(expr: Expr): Value {
    return expr.accept(this) as Value;
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

    switch (expr.operator.getType()) {
      case TokenType.PLUS:
        if (typeof left === "string" || typeof right === "string") {
          return String(left) + String(right);
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
    }
  }

  private isTruthy(value: Value): boolean {
    if (value === null || value === false) return false;
    return true;
  }

  private isEqual(a: Value, b: Value): boolean {
    return a === b;
  }

  stringify(value: Value): string {
    if (value === null) return "nil";
    return String(value);
  }
}
