import { AdminCategory, MenuBar } from "../../../components";
import { AuthContextProvider } from "../../../contexts";

export default async function AdminCategoryPage() {
  return (
    <AuthContextProvider>
      <MenuBar>
        <AdminCategory />
      </MenuBar>
    </AuthContextProvider>
  );
}
