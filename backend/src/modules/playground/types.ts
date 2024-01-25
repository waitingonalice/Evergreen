import {
  verifyCreateCollectionSchema,
  verifyExecuteCodeSchema,
} from "@expense-tracker/shared";
import { z } from "zod";

export interface CreateCollectionBody {
  input: z.infer<typeof verifyCreateCollectionSchema>;
}

export interface ExecuteCodeBody {
  input: z.infer<typeof verifyExecuteCodeSchema>;
}

export interface ExecuteCodeResponse {
  token: string;
}

export interface GetExecutedResultType {
  status: "FINISHED" | "ERROR" | "PENDING" | "COMPILING";
  output: {
    time: number | null;
    memory: number | null;
    stdout: string | null;
    stderr: string | null;
  } | null;
}

export interface GetJudgeResultType {
  source_code: string;
  language_id: number;
  stdin: string | null;
  expected_output: string | null;
  stdout: string | null;
  status_id: number;
  created_at: Date;
  finished_at: Date;
  time: number;
  memory: number;
  stderr: string | null;
  token: string;
  number_of_runs: number;
  cpu_time_limit: string;
  cpu_extra_time: string;
  wall_time_limit: string;
  memory_limit: number;
  stack_limit: number;
  max_processes_and_or_threads: number;
  enable_per_process_and_thread_time_limit: boolean;
  enable_per_process_and_thread_memory_limit: boolean;
  max_file_size: number;
  compile_output: string | null;
  exit_code: number | null;
  exit_signal: number | null;
  message: string;
  wall_time: string | null;
  compiler_options: string | null;
  command_line_arguments: string | null;
  redirect_stderr_to_stdout: boolean;
  callback_url: string | null;
  additional_files: string | null;
  enable_network: boolean;
  status: {
    id: number;
    description: string;
  };
  language: {
    id: number;
    name: string;
  };
}
