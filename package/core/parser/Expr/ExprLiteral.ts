// Auto-generated AST node Literal

import { Expr } from "./Expr";
import type { Visitor } from "./ExprVisitor";

export class ExprLiteral extends Expr {
  value: any;

  constructor(value: any) {
    super();
    this.value = value;
  }

  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitLiteralExpr(this);
  }
}
