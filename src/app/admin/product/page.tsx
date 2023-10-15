import { AdminProduct, MenuBar } from "../../../components";
import { AuthContextProvider } from "../../../contexts";

export default async function AdminProductPage() {
  return (
    <AuthContextProvider>
      <MenuBar>
        <AdminProduct />
      </MenuBar>
    </AuthContextProvider>
  );
}
