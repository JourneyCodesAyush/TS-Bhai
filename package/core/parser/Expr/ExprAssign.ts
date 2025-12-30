import { Expr } from "./Expr";
import type { Visitor } from "./ExprVisitor";

import { Token } from "../../lexer/index";

export class ExprAssign extends Expr {
  name: Token;
  value: Expr;

  constructor(name: Token, value: Expr) {
    super();
    this.name = name;
    this.value = value;
  }

  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitAssignExpr(this);
  }
}
