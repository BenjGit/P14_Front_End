import { useAtom } from 'jotai';
import { employeeListAtom } from '../../atoms/employeeListAtom';
import states from '../../data/statesData';

import './index.css'
import { Link } from 'react-router-dom';
import { Modal } from 'ben-modal-component';
import { useState } from 'react';

const CreateEmployee = () => {
    const [employeeList, setEmployeeList] = useAtom(employeeListAtom);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');

    const handleDateChange = e => {
      setSelectedDate(e.target.value);
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false)
    }

    const handleSave = (e) => {
        e.preventDefault();
        const formData = {
            firstName: e.target.elements['first-name'].value,
            lastName: e.target.elements['last-name'].value,
            birthDate: e.target.elements['birth-date'].value,
            startDate: e.target.elements['start-date'].value,
            department: e.target.elements['department'].value,
            address: {
                street: e.target.elements['street'].value,
                city: e.target.elements['city'].value,
                state: e.target.elements['state'].value,
                zipCode: e.target.elements['zip-code'].value
            }
        };


        setEmployeeList([...employeeList, formData]);
        e.target.reset();
        setShowSuccessModal(true)
    }

    return (
    <>
        <div className="title">
            <h1>HRnet</h1>
        </div>
        <div className="container">
            <Link to="/EmployeeList">View Current Employees</Link>
            <h2>Create Employee</h2>
            <form onSubmit={handleSave} id="create-employee">
                <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" />

                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" />
                    
                    <label htmlFor="birth-date">Date of Birth</label>
                    <input className="birth-date" id="birth-date" type="date" value={selectedDate} onChange={handleDateChange} />
                    
                    <label htmlFor="start-date">Start Date</label>
                    <input className="start-date" id="start-date" type="date" value={selectedDate} onChange={handleDateChange} />

                    <fieldset className="address">
                        <legend>Address</legend>

                        <label htmlFor="street">Street</label>
                        <input id="street" type="text" />

                        <label htmlFor="city">City</label>
                        <input id="city" type="text" />

                        <label htmlFor="state">State</label>
                        <select name="state" id="state">
                            {states.map((state) => (
                                <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                            ))}
                        </select>

                        <label htmlFor="zip-code">Zip Code</label>
                        <input id="zip-code" type="number" />
                    </fieldset>

                    <label htmlFor="department">Department</label>
                    <select name="department" id="department">
                        <option>Sales</option>
                        <option>Marketing</option>
                        <option>Engineering</option>
                        <option>Human Resources</option>
                        <option>Legal</option>
                    </select>
                    <div className='btn-container'>
                        <button type="submit" className='save-btn'>Save</button>
                    </div>
            </form>
        </div>
    <Modal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
    >
       success
    </Modal>
</>
    )
}

export default CreateEmployee