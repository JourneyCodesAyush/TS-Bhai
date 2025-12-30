import { Expr } from "../Expr/Expr";
import { Stmt } from "./Stmt";
import type { StmtVisitor } from "./StmtVisitor";

export class StmtWhile extends Stmt {
  condition: Expr;
  body: Stmt;

  constructor(condition: Expr, body: Stmt) {
    super();
    this.condition = condition;
    this.body = body;
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitWhileStmt(this);
  }
}
