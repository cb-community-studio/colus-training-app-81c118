
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { useState } from 'react';
import _ from 'lodash';
import { Button } from 'primereact/button';


const UserdetailsDataTable = ({ items, onEditRow, onRowDelete, onRowClick }) => {
    
    const pTemplate0 = (rowData, { rowIndex }) => <p >{rowData.firstname}</p>
    const pTemplate1 = (rowData, { rowIndex }) => <p >{rowData.lastname}</p>
    const pTemplate2 = (rowData, { rowIndex }) => <p >{rowData.email}</p>
    const pTemplate3 = (rowData, { rowIndex }) => <p >{rowData.organization}</p>
    const pTemplate4 = (rowData, { rowIndex }) => <p >{rowData.department}</p>
    const pTemplate5 = (rowData, { rowIndex }) => <p >{rowData.mobile}</p>

    const editTemplate = (rowData, { rowIndex }) => <Button onClick={() => onEditRow(rowData, rowIndex)} icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`} className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`} />;
    const deleteTemplate = (rowData, { rowIndex }) => <Button onClick={() => onRowDelete(rowIndex)} icon="pi pi-times" className="p-button-rounded p-button-danger p-button-text" />;
    
    return (
        <DataTable value={items} onRowClick={onRowClick} scrollable rowHover paginator rows={10} rowClassName="cursor-pointer">
            <Column field="firstname" header="First Name" body={pTemplate0} style={{ minWidth: "8rem" }} />
            <Column field="lastname" header="Last Name" body={pTemplate1} style={{ minWidth: "8rem" }} />
            <Column field="email" header="email" body={pTemplate2} style={{ minWidth: "8rem" }} />
            <Column field="organization" header="Organization" body={pTemplate3} style={{ minWidth: "8rem" }} />
            <Column field="department" header="Department" body={pTemplate4} style={{ minWidth: "8rem" }} />
            <Column field="mobile" header="Mobile Number" body={pTemplate5} style={{ minWidth: "8rem" }} />

            <Column header="Edit" body={editTemplate} />
            <Column header="Delete" body={deleteTemplate} />
        </DataTable>
    );
};

export default UserdetailsDataTable;