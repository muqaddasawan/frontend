import { Route, Routes } from "react-router-dom";
import Main from "./Client/Pages/Main";
import MainAdmin from "./Admin/index";
import ClientLogin from "../src/Client/Pages/ClientLogin";
import ClientRegister from "../src/Client/Pages/ClientRegister";
import ChangePassword from "../src/Client/Pages/ChangePassword";
import ProtectedRoutes from "./Services/protectedRoutes";
import ProtectedAdminRoutes from "./Services/protectedAdminRoutes";
import AdminRegister from "./Admin/pages/AdminRegister";
import LoginAdmin from "./Admin/pages/LoginAdmin";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route element={<ProtectedAdminRoutes />}>
          <Route path="/admin/*" element={<MainAdmin />} />
          <Route path="/admin-user/register" element={<AdminRegister />} />
        </Route>

        <Route path="/admin-user/login" element={<LoginAdmin />} />
        <Route path="/user/login" element={<ClientLogin />} />
        <Route path="/user/register" element={<ClientRegister />} />
        <Route path="/user/change-password" element={<ProtectedRoutes />}>
          <Route path="/user/change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
