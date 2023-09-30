import { Table } from "~/components";
import { column } from "./Column";

export const TransactionTable = () => (
  <Table>
    <Table.Header>
      <Table.CheckboxTH key="checkbox" />
      {column.map(({ name }) => (
        <Table.TH key={name}>{name}</Table.TH>
      ))}
    </Table.Header>

    <Table.Body>{/* <Table.Row></Table.Row> */}</Table.Body>
  </Table>
);
