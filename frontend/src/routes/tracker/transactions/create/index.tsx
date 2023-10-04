import {
  CategoryEnum,
  TransactionTypeEnum,
  arrayTransactionSchema,
  transactionSchema,
} from "@expense-tracker/shared";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { nanoid } from "nanoid";
import { z } from "zod";
import {
  Button,
  Card,
  FormSelect,
  Input,
  Main,
  Modal,
  Text,
} from "~/components";
import { Animate } from "~/components/animate";
import { Radio } from "~/components/radio";
import { clientRoutes } from "~/constants";
import { useForm } from "~/utils";
import { enumsToOptions } from "~/utils/options";

interface FormDataType extends z.infer<typeof transactionSchema> {
  id: string;
}

const initialData = {
  id: nanoid(),
  title: "",
  description: "",
  amount: "",
  category: "",
  type: TransactionTypeEnum.INCOME,
};

function CreateTransaction() {
  const [formData, setFormData] = useState<Array<FormDataType>>([initialData]);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const { ref, onSubmitValidate, validate } = useForm({
    zod: transactionSchema,
    data: formData,
  });

  const handleOnBackClick = () => {
    const hasValues = formData.some((form) => {
      const entries = Object.entries(form);
      return entries.some(
        ([key, value]) => key !== "id" && key !== "type" && value !== ""
      );
    });
    if (hasValues) {
      return setModal(true);
    }
    return navigate(clientRoutes.transactions.index);
  };

  const handleCloseModal = () => setModal(false);

  const handleLeave = () => {
    handleCloseModal();
    navigate(clientRoutes.transactions.index);
  };

  const handleOnChange = (
    key: keyof (typeof formData)[number],
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => {
      const deepClone = { ...prev[index] };
      if (key !== "id") deepClone[key] = event.target.value;
      const clone = [...prev];
      clone[index] = deepClone;
      return clone;
    });
  };

  const handleAddTransaction = () => {
    if (formData.length < 9)
      setFormData((prev) => {
        const clone = [...prev];
        clone.push({ ...initialData, id: nanoid() });
        return clone;
      });
  };

  const handleDeleteTransaction = (index: number) => {
    setFormData((prev) => {
      const clone = [...prev];
      clone.splice(index, 1);
      return clone;
    });
  };

  const handleSubmit = () => {
    const success = onSubmitValidate(arrayTransactionSchema);
    console.log(success);
    if (success) {
      console.dir(formData);
    }
  };

  const disableActions = formData.length === 1;

  const total = formData.reduce((acc, curr) => {
    let amount = acc;
    if (curr.type === TransactionTypeEnum.INCOME) {
      amount += Number(curr.amount);
    } else {
      amount -= Number(curr.amount);
    }
    return Number(amount.toFixed(2));
  }, 0);

  return (
    <Main>
      <Main.Header
        buttons={[
          {
            children: "Add another transaction",
            onClick: handleAddTransaction,
            variant: "primaryLink",
          },
          {
            children: "Submit",
            onClick: handleSubmit,
          },
        ]}
        onBackClick={() => handleOnBackClick()}
        title="Create transaction"
      />
      <Main.Content>
        <Modal
          title="You currently have unsaved changes."
          open={modal}
          onClose={() => setModal(false)}
          buttons={[
            {
              variant: "secondary",
              children: "Cancel",
              onClick: handleCloseModal,
            },
            {
              children: "Leave",
              onClick: handleLeave,
            },
          ]}
        >
          Leaving this page will result in losing all unsaved changes. Are you
          sure you want to leave?
        </Modal>
        <Text type="subhead-2-bold" className="text-dark mb-2 flex justify-end">
          Total:&nbsp;${total || 0}
        </Text>
        <div
          className={clsx(
            formData.length > 1 && "grid-cols-3",
            "gap-10 justify-center grid"
          )}
        >
          {formData.map((form, index) => (
            <Animate
              show
              enter="transition-all duration-150"
              enterFrom="opacity-100"
              leaveTo="opacity-0"
              key={form.id}
            >
              <Card
                className={clsx(
                  formData.length > 1 ? "w-full" : "w-96",
                  "gap-y-6"
                )}
              >
                <div className="flex justify-end">
                  <Button
                    variant="errorLink"
                    disabled={disableActions}
                    onClick={() => handleDeleteTransaction(index)}
                  >
                    Delete
                  </Button>
                </div>
                <Input
                  ref={ref}
                  validate={validate}
                  onChange={(e) => handleOnChange("title", index, e)}
                  value={form.title}
                  id="title"
                  placeholder="E.g. Gym"
                  size="small"
                  label={{
                    text: "Title",
                    required: true,
                  }}
                  subText="Max 300 characters"
                />
                <Input
                  ref={ref}
                  validate={validate}
                  onChange={(e) => handleOnChange("description", index, e)}
                  value={form.description}
                  id="description"
                  placeholder="E.g. January 2021 Gym Membership Fee"
                  size="small"
                  label={{
                    text: "Description",
                  }}
                  subText="Max 800 characters"
                />
                <Input
                  ref={ref}
                  validate={validate}
                  onChange={(e) => handleOnChange("amount", index, e)}
                  value={form.amount}
                  id="amount"
                  placeholder="E.g. 40.50"
                  prefixIcon={<Text type="caption">$</Text>}
                  size="small"
                  label={{
                    text: "Amount",
                    required: true,
                    withTooltip: true,
                    tooltip: {
                      position: "right",
                      description:
                        "Keep amount to a maximum of 2 decimal places. This will prevent rounding errors when calculating your balance.",
                    },
                  }}
                />
                <FormSelect
                  ref={ref}
                  validate={validate}
                  placeholder="Select a category"
                  onChange={(e) => handleOnChange("category", index, e)}
                  value={form.category}
                  label={{
                    text: "Category",
                    required: true,
                  }}
                  options={enumsToOptions(CategoryEnum)}
                  id="category"
                  size="small"
                />
                <div className="flex gap-y-4 flex-col">
                  <Radio
                    onChange={(e) => handleOnChange("type", index, e)}
                    selectedValue={form.type}
                    value={TransactionTypeEnum.INCOME}
                    label={{ text: "Income" }}
                    subText="Transaction that will be added to your balance."
                    id={`income${index}`}
                  />
                  <div className="h-px bg-gray-400" />
                  <Radio
                    onChange={(e) => handleOnChange("type", index, e)}
                    selectedValue={form.type}
                    value={TransactionTypeEnum.EXPENSE}
                    label={{ text: "Expense" }}
                    subText="Transaction that is subtracted from your balance."
                    id={`expense${index}`}
                  />
                </div>
              </Card>
            </Animate>
          ))}
        </div>
      </Main.Content>
    </Main>
  );
}

export default CreateTransaction;
