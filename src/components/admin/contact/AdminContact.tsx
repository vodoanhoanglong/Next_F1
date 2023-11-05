"use client";

import React from "react";
import { IContactData } from ".";
import { TableCommonHeader, TableCustom, TableSchemaParam } from "../table";
import { getDataContactAction } from "./action";

const ContactTableHeader: TableCommonHeader<IContactData>[] = [
  { label: "Họ tên", key: "fullName", align: "start" },
  { label: "Email", key: "email", align: "start" },
  { label: "Số điện thoại", key: "phoneNumber", align: "start" },
  { label: "Thông tin thêm", key: "metadata", align: "start" },
];

const ContactTableCustom = {
  fullName: (param) => <p className="text-bold text-medium">{param.data.fullName}</p>,
  email: (param) => <p className="text-bold text-medium">{param.data.email}</p>,
  phoneNumber: (param) => <p className="text-bold text-medium">{param.data.phoneNumber}</p>,
  metadata: (param) => <p className="text-bold text-medium">{param.data.metadata?.message}</p>,
} as TableSchemaParam<IContactData>;

export default function AdminContact() {
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState({
    contacts: [] as IContactData[],
    totalContacts: 0,
  });

  React.useEffect(() => {
    setLoading(true);

    getDataContactAction(page).then((res) => {
      setData({
        contacts: res.contacts,
        totalContacts: res.totalContacts,
      });
      setLoading(false);
    });
  }, [page]);

  return (
    <div className="admin__contact">
      <div className="admin__contact-table">
        <TableCustom
          page={page}
          setPage={setPage}
          data={data.contacts}
          total={data.totalContacts}
          tableCustom={ContactTableCustom}
          headers={ContactTableHeader}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
