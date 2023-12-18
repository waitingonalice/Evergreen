import { Options } from "@swc/wasm-web";

let swc: typeof import("@swc/wasm-web") | null = null;

export const executeCode = async (code?: string) => {
  if (!swc) {
    swc = await import("@swc/wasm-web");
    await swc.default();
  }
  const options: Options = {
    jsc: {
      parser: {
        syntax: "typescript",
        tsx: true,
      },
    },
    module: {
      type: "commonjs",
    },
  };
  return swc.transformSync(code ?? "console.log('Hello World!')", options).code;
};
