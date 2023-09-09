import { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Datatables, { redrawDataTable } from "../../components/Datatables";
import { now } from 'lodash';
import { ROLE_LIST } from "../../components/APIRoutes";
import { Context } from '../../components/Context'
import { createRoot } from "react-dom/client"

const ManageRoles = () => {
    
    const [context] = useContext(Context)
    const [reload, setReload] = useState(now);

    const [dt] = useState({
        dt_url: ROLE_LIST,
        dt_name: 'role-List',
        dt_export: true,
        dt_column: [
            { data: 'id', name: 'id', title: '#' },
            { data: 'name', name: 'name', title: 'Role Name', class: "text-nowrap minw-130px" },    
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 2,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                            <div className="d-flex text-nowrap">
                                <button type="button" className="btn btn-sm btn-soft-success" data-bs-target="#locationTicket" data-bs-toggle="modal">
                                    <i className="ri-pencil-fill"></i>
                                </button>
                            </div>
                    ) 
                }
            }
        ]
    });

    useEffect(() => {
        if (dt) {
            redrawDataTable(dt);
        }
    }, [dt, reload, context])

    return (
        <>
            <Breadcrumbs title="Manage Roles" parentPage="Permission" />
            <Datatables dt_name="role-List" dataPageLength="15"  />
        </>
    );

}
export default ManageRoles;