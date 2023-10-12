import { AdminProduct, MenuBar } from "../../../components";
import { IPageProps } from "../../../shared";

export default async function AdminProductPage({ searchParams }: IPageProps) {
  return (
    <MenuBar>
      <AdminProduct />
    </MenuBar>
  );
}
