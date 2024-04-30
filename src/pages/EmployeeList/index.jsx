import { useEffect } from "react"
import { useAtom } from 'jotai';
import { employeeListAtom } from '../../atoms/employeeListAtom'
import DataTable from 'react-data-table-component';
import DataTableExtensions from "react-data-table-component-extensions";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './style.css'


const EmployeeList = () => {
    const [employees] = useAtom(employeeListAtom);
    
    useEffect(() => {
    }, [employees]    )

    const columns = [
        { name: 'First Name' , selector: row => row.firstName , sortable: true },
        { name: 'Last Name', selector: row => row.lastName , sortable: true },
        { name: 'Start Date', selector: row => row.startDate , sortable: true },
        { name: 'Department', selector: row => row.department, sortable: true },
        { name: 'Birth Date', selector: row => row.dateOfBirth, sortable: true },
        { name: 'Street', selector: row => row.address.street, sortable: true },
        { name: 'City', selector: row => row.address.city , sortable: true },
        { name: 'State', selector: row => row.address.state , sortable: true },
        { name: 'Street', selector: row => row.address.zipCode , sortable: true },
    ];

    return(
        <div>
            {employees.length > 0 ? (
            <>
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <DataTableExtensions
                    columns={columns}
                    data={employees}
                    print={false}
                    export={false}
                >
                    <DataTable
                        title={<div className="centered-title">Current Employees</div>}
                        pagination
                        highlighOnHover
                        responsive
                    />
                </DataTableExtensions>
            </>
            ): (
                <p>No employees created yet.</p>
            )}
        </div>
    );
}

export default EmployeeList