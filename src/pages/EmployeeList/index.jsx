import { useEffect } from "react"
import { useAtom } from 'jotai';
import { employeeListAtom } from '../../atoms/employeeListAtom'
import DataTable from 'react-data-table-component';


const EmployeeList = () => {
    const [employees] = useAtom(employeeListAtom);
    

    useEffect(() => {
    }, [employees]    )

    const columns = [
        { name: 'First Name' , selector: row => row.firstName , sortable: true },
        { name: 'Last Name', selector: row => row.lastName , sortable: true },
        { name: 'Start Date', selector: row => row.startDate , sortable: true },
        { name: 'Department', selector: row => row.department, sortable: true },
        { name: 'Date of Birth', selector: row => row.dateOfBirth, sortable: true },
        { name: 'Street', selector: row => row.address.street, sortable: true },
        { name: 'City', selector: row => row.address.city , sortable: true },
        { name: 'State', selector: row => row.address.state , sortable: true },
        { name: 'Street', selector: row => row.address.zipCode , sortable: true },
    ];

    return(
        <div>
            {employees.length > 0 ? (
                <DataTable
                    title = 'Employee Data'
                    columns={columns}
                    data={employees}
                    pagination
                    highlighOnHover
                    responsive
                />
            ): (
                <p>No employees created yet.</p>
            )}
        </div>
    );
}

export default EmployeeList