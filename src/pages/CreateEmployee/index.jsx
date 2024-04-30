import { useAtom } from 'jotai';
import { employeeListAtom } from '../../atoms/employeeListAtom';
import states from '../../data/statesData';
import './style.css'
import { Link } from 'react-router-dom';
import { Modal } from 'ben-modal-component';
import { useState } from 'react';

const CreateEmployee = () => {
    const [employeeList, setEmployeeList] = useAtom(employeeListAtom);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [error, setError] = useState('');

    const handleDateChange = e => {
      setSelectedDate(e.target.value);
    };

    const validateForm = () => {
        if (
          !document.getElementById('first-name').value ||
          !document.getElementById('last-name').value ||
          !document.getElementById('birth-date').value ||
          !document.getElementById('start-date').value ||
          !document.getElementById('street').value ||
          !document.getElementById('city').value ||
          !document.getElementById('state').value ||
          !document.getElementById('zip-code').value ||
          !document.getElementById('department').value
        ) {
          setError('Please fill in all fields');
          return false;
        }
        return true;
    };

    const handleCloseSuccessModal = () => {
        setShowSuccessModal(false)
    }

    const handleSave = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
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
        setError('');
    }

    return (
    <>
        <header className="header">
            <h1>HRnet</h1>
            <Link to="/EmployeeList" className='link'>View Current Employees</Link>
        </header>
        <div className="container">
            <div className='form-create'>
                <h2>Create Employee</h2>
                {error && <span className="error">{error}</span>}
                <form onSubmit={handleSave} id="create-employee">
                    <label htmlFor="first-name" className="visually-hidden">First Name</label>
                        <input type="text" id="first-name" placeholder="First Name"/>

                        <label htmlFor="last-name" className="visually-hidden">Last Name</label>
                        <input type="text" id="last-name" placeholder="Last Name"/>
                        
                        <label htmlFor="birth-date" className="visually-hidden">Date of Birth</label>
                        <input className="birth-date" id="birth-date" type="date" value={selectedDate} onChange={handleDateChange} />
                        
                        <label htmlFor="start-date" className="visually-hidden">Start Date</label>
                        <input className="start-date" id="start-date" type="date" value={selectedDate} onChange={handleDateChange} />

                        <fieldset className="address">
                            <legend>Address</legend>

                            <label htmlFor="street" className="visually-hidden">Street</label>
                            <input id="street" type="text" placeholder="Street"/>

                            <label htmlFor="city" className="visually-hidden">City</label>
                            <input id="city" type="text" placeholder="City"/>

                            <label htmlFor="state" className="visually-hidden">State</label>
                            <select name="state" id="state" placeholder="State" defaultValue="">
                                <option className="option-placeholder" value="" disabled>Select state</option>
                                {states.map((state) => (
                                    <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                                ))}
                            </select>

                            <label htmlFor="zip-code" className="visually-hidden">Zip Code</label>
                            <input id="zip-code" type="number" placeholder="Zip Code"/>
                        </fieldset>

                        <label htmlFor="department" className="visually-hidden">Department</label>
                        <select name="department" id="department" defaultValue="">
                            <option className="option-placeholder" value="" disabled>Select department</option>
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
        </div>
    <Modal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
    >
       Employee Created
    </Modal>
</>
    )
}

export default CreateEmployee