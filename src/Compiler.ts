import * as ts from "typescript";

export function compile(
  fileNames: string[],
  options: ts.CompilerOptions
): void {
  let program = ts.createProgram(fileNames, options);
  let emitResult = program.emit();
}
