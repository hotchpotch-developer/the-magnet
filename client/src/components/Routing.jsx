import { Route, Routes } from  "react-router-dom";
import Layout from "./Layout";
import Login from "../modules/Auth/Login";
import ForgotPassword from "../modules/Auth/ForgotPassword";
import Dashboard from "../modules/Dashboard/Dashboard";
import CreateManager from "../modules/Manager/CreateManager";
import ManageList from "../modules/CommonSettings/ManagesStates/ManageList";

const Routing = () => {

    return (
        <>
            <Routes>
                <Route caseSensitive={false} path="/" element={ <Login /> } />
                <Route caseSensitive={false} path="/forgot-password" element={ <ForgotPassword /> } />
                
                <Route caseSensitive={false} path="/" element={<Layout />}>
                    <Route caseSensitive={false} path="/dashboard" element={ <Dashboard />} />

                    {/* Manager Routes */}
                    <Route caseSensitive={false} path="/add-manager" element={ <CreateManager />} />

                    {/* Common Settings Routes */}

                    <Route caseSensitive={false} path="/manage-states" element={ <ManageList />} />

                </Route>
            </Routes>
        </>
    )

}

export default Routing