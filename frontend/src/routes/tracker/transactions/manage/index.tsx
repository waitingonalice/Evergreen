import { PlusIcon } from "@heroicons/react/20/solid";
import { Main, Text } from "~/components";
import { clientRoutes } from "~/constants";
import { TransactionTable } from "./transaction-table";

function Payments() {
  return (
    <Main>
      <Main.Header
        buttons={[
          {
            children: (
              <a href={clientRoutes.transactions.create}>Create transaction</a>
            ),
            prefixIcon: <PlusIcon className="w-5 h-auto" />,
          },
        ]}
        // search={{
        //   placeholder: "Enter transaction name or description",
        //   // onChange: () => {},
        //   value: "",
        // }}
      />
      <Main.Content>
        <Text type="subhead-1-bold" className="text-dark mb-4">
          Transactions
        </Text>
        <TransactionTable />
        {/* <TableSkeleton columns={column} rows={10} withCheckbox /> */}
      </Main.Content>
    </Main>
  );
}

export default Payments;
