import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React from "react";
import { productLimit } from "../../../shared";

export type TableCommonParam<T> = {
  data: T;
  columnKey: keyof T;
  onOpen: () => void;
  setOpenView: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setActionData: React.Dispatch<React.SetStateAction<T>>;
};

export type TableSchemaParam<T> = Record<keyof T | "actions", (param: TableCommonParam<T>) => React.JSX.Element>;

export type TableCommonHeader<T> = {
  label: string;
  key: keyof T | "actions";
  align: "center" | "start" | "end" | undefined;
};

export default function TableCustom<T extends { id: string }>({
  data,
  total,
  page,
  tableCustom,
  headers,
  isLoading,
  setPage,
  setOpenView,
  setOpenDelete,
  setActionData,
  onOpen,
}: {
  data: T[];
  total: number;
  page: number;
  onOpen: () => void;
  setOpenView: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenDelete: React.Dispatch<React.SetStateAction<boolean>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setActionData: React.Dispatch<React.SetStateAction<T>>;
  tableCustom: TableSchemaParam<T>;
  headers: TableCommonHeader<T>[];
  isLoading: boolean;
}) {
  const totalPages = total ? Math.ceil(total / productLimit) : 0;

  return (
    <Table
      aria-label="Example table with custom cells"
      isStriped
      bottomContent={
        totalPages ? (
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={totalPages}
              onChange={(page) => setPage(page)}
            />
          </div>
        ) : null
      }
    >
      <TableHeader columns={headers}>
        {(column) => (
          <TableColumn key={column.key as string} align={column.align} className="text-large font-extrabold">
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      {isLoading ? (
        <TableBody isLoading={isLoading} loadingContent={<Spinner label="Đang tải..." />}>
          <TableRow>{(columnKey) => <TableCell className="invisible pt-[30%]">{columnKey}</TableCell>}</TableRow>
        </TableBody>
      ) : (
        <TableBody items={data}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>
                  {tableCustom[columnKey as keyof T]({
                    data: item,
                    columnKey: columnKey as keyof T,
                    setOpenView,
                    setActionData,
                    setOpenDelete,
                    onOpen,
                  })}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
}
