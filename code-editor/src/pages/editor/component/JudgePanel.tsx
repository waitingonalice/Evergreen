import { PlayIcon } from "@heroicons/react/20/solid";
import { transpile } from "~/utils/transpile";

interface JudgePanelProps {
  code: string;
}

export const JudgePanel = ({ code }: JudgePanelProps) => {
  const handleRun = async () => {
    const transpiledCode = await transpile(code);
    console.log(transpiledCode);
  };

  return (
    <div className="flex overflow-y-auto h-full flex-col border border-secondary-4">
      <div className="p-2 gap-x-2 flex justify-end items-center border-b border-secondar-4">
        <PlayIcon
          className="w-5 h-5 text-secondary-4 hover:text-secondary-1 transition duration-300"
          role="button"
          onClick={handleRun}
        />
      </div>
    </div>
  );
};
