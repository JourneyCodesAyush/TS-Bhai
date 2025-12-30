import { Stmt } from "./Stmt";
import type { StmtVisitor } from "./StmtVisitor";

export class StmtBreak extends Stmt {
  constructor() {
    super();
  }

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitBreakStmt(this);
  }
}
