import { Expr } from "../Expr/Expr";
import { Stmt } from "./Stmt";
import type { StmtVisitor } from "./StmtVisitor";

export class StmtExpr extends Stmt {
  expression: Expr;

  constructor(expression: Expr) {
    super();
    this.expression = expression;
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitExpressionStmt(this);
  }
}
