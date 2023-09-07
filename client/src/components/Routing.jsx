import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from  "react-router-dom";
import { Context } from "./Context";
import Layout from "./Layout";
import Login from "../modules/Auth/Login";
import ForgotPassword from "../modules/Auth/ForgotPassword";
import Dashboard from "../modules/Dashboard/Dashboard";
import CreateManager from "../modules/Manager/CreateManager";
import ManageList from "../modules/CommonSettings/ManagesStates/ManageList";
import { fetchData } from "./Helper";
import { GET_AUTH_INFO } from "./APIRoutes";


const Routing = () => {

    const [context, setContext] = useState('')
    const token = localStorage.getItem('accessToken')
    const navigate = useNavigate()

    useEffect(() => {

        if(token) {
            fetchData(GET_AUTH_INFO, 'GET', '', true, false, (res) => {
                if(res.status == 200 && res.data) {
                    setContext(prev => ({...prev, auth: res.data}));
                }
            })
        }
    }, [token])

    return (
        <Context.Provider value={[context, setContext]}>
            <Routes>
                {context && context.auth &&
                    <Route caseSensitive={false} path="" element={<Layout />}>
                        <Route caseSensitive={false} path="/" element={ <Dashboard />} />

                        {/* Manager Routes */}
                        <Route caseSensitive={false} path="/add-manager" element={ <CreateManager />} />

                        {/* Common Settings Routes */}

                        <Route caseSensitive={false} path="/manage-states" element={ <ManageList />} />

                    </Route>
                }
                
                <Route caseSensitive={false} path="/" element={ <Login /> } />
                <Route caseSensitive={false} path="/forgot-password" element={ <ForgotPassword /> } />
            </Routes>
        </Context.Provider>
    )

}

export default Routing