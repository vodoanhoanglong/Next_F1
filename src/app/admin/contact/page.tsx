import { AdminContact, MenuBar } from "../../../components";
import { AuthContextProvider } from "../../../contexts";

export default async function AdminContactPage() {
  return (
    <AuthContextProvider>
      <MenuBar>
        <AdminContact />
      </MenuBar>
    </AuthContextProvider>
  );
}
