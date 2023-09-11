import { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Datatables, { redrawDataTable } from "../../components/Datatables";
import { Context } from "../../components/Context";
import { now } from "lodash";
import { createRoot } from "react-dom/client";
import { PERMISSION_LIST } from "../../components/APIRoutes";
import $ from 'jquery'

const ManagePermission = () => {

    const [context] = useState(Context)
    const [reload, setReload] = useState(now)
    const [editData, setEditData] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)

    const [dt] = useState({
        dt_url: PERMISSION_LIST,
        dt_name: 'permission-List',
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
                            <>
                                <div className="d-flex text-nowrap">
                                    <button type="button" className="btn btn-soft-success" data-bs-target="#addRole" data-bs-toggle="modal" onClick={() => setEditData(records)}>
                                        <i className="ri-pencil-fill"></i>
                                    </button>

                                    <button type="button" className="btn btn-soft-danger ms-2" data-bs-target="#confirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)}>
                                        <i className="ri-delete-bin-line"></i>
                                    </button>
                                </div>
                            </>
                    ) 
                }
            }
        ]
    });

    useEffect(() => {
        if (dt) {
            redrawDataTable(dt);
        }

        {(!$('.dt-custom-filter button').hasClass('add-new')) &&
            $('.dt-custom-filter').append(`<button type="button" class="btn btn-sm btn-info add-btn add-new me-3" onclick="resetData()" data-bs-toggle="modal" data-bs-target="#addRole" >
                <i class="ri-user-add-line"></i> Add New
            </button>`)
        }
    }, [dt, reload, context])

    return (
        <>
            <Breadcrumbs title="Manage Permission" parentPage="Permission"  />
            <Datatables dt_name="permission-List" dataPageLength="15"  />
        </>
    )

}

export default ManagePermission;