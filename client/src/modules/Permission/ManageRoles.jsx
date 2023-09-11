import { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Datatables, { redrawDataTable, reloadDataTable } from "../../components/Datatables";
import { now } from 'lodash';
import { CREATE_ROLE, DELETE_ROLE, EDIT_ROLE, ROLE_LIST } from "../../components/APIRoutes";
import { Context } from '../../components/Context'
import { createRoot } from "react-dom/client"
import $ from 'jquery'
import * as Elements from "../../components/Elements";
import { fetchData, initialFormState, validateForm } from "../../components/Helper";

const ManageRoles = () => {
    
    const [context] = useContext(Context)
    const [reload, setReload] = useState(now);
    const [loader, setLoader] = useState(false)
    const [editData, setEditData] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)

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

    const saveUpdateRole = (e) => {
        e.preventDefault()

        if(validateForm(e, 'addUpdateRole')){
            setLoader(true)
            let formData = new FormData(document.getElementById('addUpdateRole'));
        
            editData && formData.append('id', editData.id)

            fetchData(editData ? EDIT_ROLE : CREATE_ROLE, 'POST', formData, true, true, (res) => {
                setLoader(false)
                if(res.status){
                    initialFormState('addUpdateRole')
                    document.querySelector('#addRole [data-bs-dismiss="modal"]').click()
                    setReload(now)
                }
            })
        }
    }

    const deleteRole = () => {
        if(deleteRecord) {
            setLoader(true)
            fetchData(`${DELETE_ROLE}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
                setLoader(false)
                if(res.status){
                    setDeleteRecord(false)
                    document.querySelector('#confirmationModal [data-bs-dismiss="modal"]').click()
                    setReload(now)
                }

            })
        }
    }

    window.resetData = () => {
        setEditData(false)
    }

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
            <Breadcrumbs title="Manage Roles" parentPage="Permission" />
            <Datatables dt_name="role-List" dataPageLength="15"  />
            <Elements.ModalSection modalId="addRole" title={`${editData ? 'Update Role' : 'Add Role'}`} btnTitle={`${editData ? 'Update' : 'Save'}`} action={(e) => saveUpdateRole(e)} loading={loader} formId="addUpdateRole">
                <form className="needs-validation" noValidate id="addUpdateRole">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            <label htmlFor="role_name" className="form-label">Role Name</label>
                            <input type="text" className="form-control" id="role_name" name="role_name" defaultValue={editData ? editData.name : ''}  required />
                            <div className="invalid-feedback">Please Enter Role name.</div>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
            <Elements.ConfirmationModal action={() => deleteRole()} />
        </>
    );

}
export default ManageRoles;