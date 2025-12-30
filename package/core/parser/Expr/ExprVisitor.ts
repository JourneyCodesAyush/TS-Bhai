import type { Expr } from "./Expr";
import type { ExprAssign } from "./ExprAssign";
import type { ExprBinary } from "./ExprBinary";
import type { ExprGrouping } from "./ExprGrouping";
import type { ExprLiteral } from "./ExprLiteral";
import type { ExprUnary } from "./ExprUnary";
import type { ExprVariable } from "./ExprVariable";

export interface Visitor<R> {
  visitAssignExpr(node: ExprAssign): R;
  visitBinaryExpr(node: ExprBinary): R;
  visitGroupingExpr(node: ExprGrouping): R;
  visitLiteralExpr(node: ExprLiteral): R;
  visitUnaryExpr(node: ExprUnary): R;
  visitVariableExpr(node: ExprVariable): R;
}
