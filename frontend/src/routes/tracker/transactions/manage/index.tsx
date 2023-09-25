import { PlusIcon } from "@heroicons/react/20/solid";
import { Main, Text } from "~/components";
import { clientRoutes } from "~/constants";

function Payments() {
  return (
    <Main>
      <Main.Header
        buttons={[
          {
            children: (
              <a href={clientRoutes.transactions.create}>Add Transaction</a>
            ),
            prefixIcon: <PlusIcon className="w-4 h-auto" />,
          },
        ]}
      />
      <Main.Content>
        <Text type="subhead-1-bold" className="text-dark mb-4">
          Transactions
        </Text>
      </Main.Content>
    </Main>
  );
}

export default Payments;
