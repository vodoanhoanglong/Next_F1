import { AdminBlog, MenuBar } from "../../../components";
import { AuthContextProvider } from "../../../contexts";

export default async function AdminBlogPage() {
  return (
    <AuthContextProvider>
      <MenuBar>
        <AdminBlog />
      </MenuBar>
    </AuthContextProvider>
  );
}
