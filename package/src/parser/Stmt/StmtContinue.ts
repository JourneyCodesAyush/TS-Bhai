import { Stmt } from "./Stmt";
import type { StmtVisitor } from "./StmtVisitor";

export class StmtContinue extends Stmt {
  constructor() {
    super();
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitContinueStmt(this);
  }
}
