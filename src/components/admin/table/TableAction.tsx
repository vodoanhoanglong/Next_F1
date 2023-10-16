"use client";
import { Tooltip } from "@nextui-org/react";
import { TableCommonParam } from ".";
import { IProductData } from "../..";
import { DeleteIcon } from "./DeleteIcon";
import { EditIcon } from "./EditIcon";
import { EyeIcon } from "./EyeIcon";

export default function TableAction(params: TableCommonParam<IProductData>) {
  return (
    <div className="relative flex items-center gap-2">
      <Tooltip content="Details">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
          <EyeIcon />
        </span>
      </Tooltip>
      <Tooltip content="Edit user">
        <span
          className="text-lg text-default-400 cursor-pointer active:opacity-50"
          onClick={(e) => {
            e.preventDefault();
            params.setActionData(params.data);
            return params.onOpen();
          }}
        >
          <EditIcon />
        </span>
      </Tooltip>
      <Tooltip color="danger" content="Delete user">
        <span className="text-lg text-danger cursor-pointer active:opacity-50">
          <DeleteIcon />
        </span>
      </Tooltip>
    </div>
  );
}
