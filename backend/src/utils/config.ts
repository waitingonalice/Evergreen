import fs from "fs";
import path from "path";

let directory: string | undefined;
const regex = /[^/\\]+/;
/** Recursively searches up the current directory until the specified file name is found.
 * @param {string} filename The name of the file to search for.
 * @param {string} start Path leading up to the current directory. Using `__dirname` is recommended.
 * @param {string} stop The name of the path to stop searching at. Default is the root path of start parameter.
 * @returns {string} The absolute path to the specified file. If no file is found, it returns the root absolute path indicated by the start parameter.
 */
export const fileDirectory = (
  filename: string,
  start: string,
  stop = start.match(regex)?.toString()
) => {
  if (directory === undefined) {
    directory = start;
  }
  const files = fs.readdirSync(directory);
  const currentDir = path.basename(path.normalize(directory));
  if (!files.includes(filename) && currentDir !== stop) {
    directory += "/..";
    fileDirectory(filename, start, stop);
  }

  return path.resolve(directory);
};
