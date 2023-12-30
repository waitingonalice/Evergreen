/* eslint-disable react/no-array-index-key */
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/20/solid";
import { Button, ButtonProps } from "@waitingonalice/design-system";
import React from "react";
import clsx from "clsx";
import { Text } from "../text";
import { CheckboxTh, Header, Thead } from "./head";
import { Body, Cell, CheckboxCell, Row } from "./row";

interface TableFilterProps {
  onClick?: () => void;
  name: string;
  onDelete?: () => void;
  selected?: string[];
}

const TableFilterButton = (props: TableFilterProps) => {
  const { name, onDelete, onClick, selected } = props;
  const Icon = selected ? XCircleIcon : PlusCircleIcon;

  const handleOnButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  const handleOnIconClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (selected && onDelete) {
      onDelete();
    } else {
      onClick?.();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    if (event.key === "Enter" && onClick) {
      onClick();
    }
  };

  return (
    <button
      className={clsx(
        selected && selected.length > 0
          ? "border-gray-400 "
          : "border-dotted border-gray-500",
        "flex items-center gap-x-1 border w-fit px-2 py-0.5 rounded-3xl hover:bg-gray-200 active:ring-2 ring-primary-dark ring-offset-1 transition-all duration-100"
      )}
      type="button"
      onClick={handleOnButtonClick}
      onKeyDown={handleKeyDown}
    >
      <Icon
        className="w-4 h-auto text-gray-500 cursor-pointer active:text-secondary-5"
        onClick={handleOnIconClick}
      />
      <Text className="text-gray-500" type="caption-bold">
        {name}
      </Text>
      {selected && selected.length > 0 && (
        <span className="border-l h-3 border-gray-400" />
      )}
      {selected &&
        selected.map((value, index) => (
          <Text key={value} type="caption-bold" className="text-primary-main">
            {value.concat(index === selected.length - 1 ? "" : ", ")}
          </Text>
        ))}
    </button>
  );
};

export interface TableProps {
  children: React.ReactNode;
  filters?: TableFilterProps[];
  clearFilters?: () => void;
  buttons?: Omit<ButtonProps, "size">[];
}
export function Table({
  children,
  filters,
  buttons,
  clearFilters,
}: TableProps) {
  const existsSelectedFilter = filters?.some(
    (filter) => filter.selected && filter.selected.length > 0
  );

  const handleClearFilters = () => {
    if (clearFilters) {
      clearFilters();
    }
  };
  return (
    <section className="inline-block min-w-full align-middle">
      <div className="flex justify-between mb-4 gap-x-2 items-end">
        <div className="flex gap-2 flex-wrap w-1/2">
          {filters &&
            filters.map((filter, index) => (
              <TableFilterButton key={index} {...filter} />
            ))}
          {existsSelectedFilter && (
            <Button onClick={handleClearFilters} variant="primaryLink">
              Clear filters
            </Button>
          )}
        </div>
        <div className="flex flex-wrap justify-end gap-2 w-1/2">
          {buttons &&
            buttons.map((button, index) => (
              <Button size="small" key={index} {...button} />
            ))}
        </div>
      </div>
      <table className="min-w-full divide-y divide-gray-300 border-y-gray-400 border border-x-0">
        {children}
      </table>
    </section>
  );
}

Table.Header = Header;
Table.TH = Thead;
Table.CheckboxTH = CheckboxTh;
Table.Body = Body;
Table.Row = Row;
Table.Cell = Cell;
Table.CheckboxCell = CheckboxCell;
