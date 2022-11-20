import type { LoaderArgs, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
export const loader: LoaderFunction = async ({ request }: LoaderArgs) => {
  return redirect('/login');
};
