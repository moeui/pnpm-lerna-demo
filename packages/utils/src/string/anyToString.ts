export const anyToString = (s: any) => `${s}`.trim();

export const toHexString = (n: number) => `0x${n.toString(16)}`;

export function formatString(template: string, ...args: any[]): string {
  return template.replace(/{(\d+)}/g, (match: string, index: string): string => {
    const argIndex = parseInt(index, 10);
    return argIndex < args.length ? String(args[argIndex]) : match;
  });
}
// 使用示例
// const result = formatString("Hello, {0}! You have {1} new messages.", "Alice", 5);
// console.log(result); // 输出: "Hello, Alice! You have 5 new messages."
