import { generate } from "./generate";
import { parseHTML } from "./parse";

export default function compileToFunctions(template) {
  // template 模板 -> AST
  let ast = parseHTML(template);
  // AST -> 可运行代码 code（字符串形式）
  let code = generate(ast);
  // 使用 with 将 code 组合成 render 函数
  let render = `with(this){return ${code}}`;
  // 使用 Function 将字符串 转换为 函数
  let fn = new Function(render);
  return fn;
}
