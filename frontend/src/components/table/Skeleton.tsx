import { Table } from ".";

interface TableSkeletonProps {
  rows: number;
  columns: { name: string; className?: string }[];
  withCheckbox?: boolean;
}

export const TableSkeleton = ({
  rows,
  columns,
  withCheckbox,
}: TableSkeletonProps) => {
  const rowsIterable = Array.from({ length: rows }, (_, index) => index);
  return (
    <Table>
      <Table.Header>
        {withCheckbox && <Table.CheckboxTH key="checkbox" disabled />}
        {columns.map((item) => (
          <Table.TH key={item.name} className={item.className}>
            {item.name}
          </Table.TH>
        ))}
      </Table.Header>
      <Table.Body>
        {rowsIterable.map((item) => (
          <Table.Row key={item}>
            {withCheckbox && <Table.CheckboxCell key={item} disabled />}
            {columns.map((item) => (
              <Table.Cell key={item.name}>
                <div className="bg-gray-300 h-4 w-3/4 border rounded-2xl animate-pulse" />
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
