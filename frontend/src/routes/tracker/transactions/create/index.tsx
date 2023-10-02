/* eslint-disable @typescript-eslint/no-unused-vars */
import { transactionSchema } from "@expense-tracker/shared";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { FormSelect, Input, Main, Text } from "~/components";
import { clientRoutes } from "~/constants";

function CreateTransaction() {
  console.log(transactionSchema);
  const navigate = useNavigate();
  return (
    <Main>
      <Main.Header
        buttons={[
          {
            children: "Submit",
          },
        ]}
        onBackClick={() => navigate(clientRoutes.transactions.index)}
        title="Create transaction"
      />
      <Main.Content className="flex flex-col items-center gap-y-8">
        {/* <Input
          placeholder="E.g. Gym"
          size="small"
          className="w-96"
          label={{
            text: "Title",
            required: true,
          }}
        />
        <Input
          placeholder="E.g. January 2021 Gym Membership Fee"
          size="small"
          className="w-96"
          label={{
            text: "Description",
            required: true,
          }}
        />

        <Input
          placeholder="E.g. 40.50"
          prefixIcon={<Text type="caption">$</Text>}
          size="small"
          className="w-96"
          label={{
            text: "Amount",
            required: true,
          }}
        /> */}
        {/* <FormSelect /> */}
      </Main.Content>
    </Main>
  );
}

export default CreateTransaction;
