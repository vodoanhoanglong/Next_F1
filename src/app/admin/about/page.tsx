import { AdminAbout, MenuBar } from "../../../components";
import { AuthContextProvider } from "../../../contexts";

export default async function AdminAboutPage() {
  return (
    <AuthContextProvider>
      <MenuBar>
        <AdminAbout />
      </MenuBar>
    </AuthContextProvider>
  );
}
