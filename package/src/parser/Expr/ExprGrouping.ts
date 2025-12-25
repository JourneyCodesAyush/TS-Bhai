// Auto-generated AST node Grouping

import { Expr } from "./Expr";
import type { Visitor } from "./ExprVisitor";

export class ExprGrouping extends Expr {
  expression: Expr;

  constructor(expression: Expr) {
    super();
    this.expression = expression;
  }

  accept<R>(visitor: Visitor<R>): R {
    return visitor.visitGroupingExpr(this);
  }
}
