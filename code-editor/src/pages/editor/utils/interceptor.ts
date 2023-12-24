type ConsoleInputType<T> = T[];
export type ConsoleMethod = "log" | "warn" | "info" | "clear";

type JointTypes = [ConsoleInputType<string | number>, ConsoleMethod];

export const interceptConsole = (
  callback: (result: string, type: ConsoleMethod) => void
) => {
  const add = (...args: JointTypes) => {
    const [consoleArguments, type] = args;
    const inputs: typeof consoleArguments = [];
    consoleArguments.forEach((arg) => {
      if (typeof arg === "object") {
        inputs.push(JSON.stringify(arg));
      } else {
        inputs.push(arg);
      }
    });
    // Join the arguments that are passed into the same console.log as a singular string, so we can display it as a single message.
    const result = inputs.join(" ");
    if (type === "clear") {
      callback("", type);
      return;
    }
    if (!result) return;
    callback(result, type);
  };

  const tempLog = console.log;
  const tempInfo = console.info;

  console.log = (...args) => {
    tempLog(...args);
    add(args, "log");
  };

  console.info = (...args) => {
    tempInfo(...args);
    add(args, "info");
  };

  console.clear = (...args) => {
    tempInfo(
      "Console was cleared programmatically. This is not a bug in your code."
    );
    add(args, "clear");
  };
};
