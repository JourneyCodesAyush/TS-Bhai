import { Expr } from "../Expr/Expr";
import { Stmt } from "./Stmt";
import type { StmtVisitor } from "./StmtVisitor";

export class StmtPrint extends Stmt {
  expressions: Expr[];

  constructor(expressions: Expr[]) {
    super();
    this.expressions = expressions;
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitPrintStmt(this);
  }
}
