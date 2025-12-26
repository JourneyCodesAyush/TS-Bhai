import type { StmtVisitor } from "./StmtVisitor";

export abstract class Stmt {
  abstract accept<R>(visitor: StmtVisitor<R>): R;
}
