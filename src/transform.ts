import * as ts from 'typescript'
function visitor(
    ctx: ts.TransformationContext,
    sf: ts.SourceFile,
    allClassNames: Record<string, string>
  ) {
    const visitor: ts.Visitor = (node: ts.Node): ts.Node => {
      let newNode: ts.Node;
      let cssPath: string;
      if (ts.isStringLiteral(node) && node.getText(sf) in allClassNames) {
        
      }
      return ts.visitEachChild(node, visitor, ctx);
    };
  
    return visitor;
  }

  
export default function(allClassNames: Record<string, string>) {
    return (ctx: ts.TransformationContext): ts.Transformer<ts.SourceFile> => {
      return (sf: ts.SourceFile) =>
        ts.visitNode(sf, visitor(ctx, sf, allClassNames));
    };
  }