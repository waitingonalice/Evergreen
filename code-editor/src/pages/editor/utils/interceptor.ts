type ConsoleInputType = any[];
export type ConsoleMethod = "log" | "warn" | "info" | "clear";

type JointTypes = [ConsoleInputType, ConsoleMethod];

export const interceptConsole = (
  callback: (result: ConsoleInputType, type: ConsoleMethod) => void
) => {
  const add = (...args: JointTypes) => {
    const [consoleArguments, type] = args;
    if (type === "clear") {
      callback([], type);
      return;
    }
    callback(consoleArguments, type);
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
    tempInfo("Console was cleared programmatically.");
    add(args, "clear");
  };
};
