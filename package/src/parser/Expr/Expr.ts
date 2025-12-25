// Auto-generated base class for Expr

import type { Visitor } from './ExprVisitor';

export abstract class Expr {
    abstract accept<R>(visitor: Visitor<R>): R;
}
