import { AdminConfig, MenuBar } from "../../../components";
import { AuthContextProvider } from "../../../contexts";

export default async function AdminConfigPage() {
  return (
    <AuthContextProvider>
      <MenuBar>
        <AdminConfig />
      </MenuBar>
    </AuthContextProvider>
  );
}
