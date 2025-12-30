import { Token } from "../../lexer/index";
import { Expr } from "./Expr";
import type { Visitor } from "./ExprVisitor";

export class ExprVariable extends Expr {
  name: Token;

  constructor(name: Token) {
    super();
    this.name = name;
  }

  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitVariableExpr(this);
  }
}
