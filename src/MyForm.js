import React, { useState } from 'react';
import './MyForm.css'
function MyForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    pincode: '',
    mobileNumber: ''
  });

  const [tableData, setTableData] = useState([]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTableData([...tableData, formData]);
    setFormData({
      firstName: '',
      lastName: '',
      address: '',
      pincode: '',
      mobileNumber: ''
    });
  };

  return (
    <div className='cont'>
      <form  className='form' onSubmit={handleSubmit}>
        <div>
          <label>
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Pincode:
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <div>
          <label>
            Mobile Number:
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <button type="submit">Save</button>
      </form>
      <table className='tab'>
        <thead className='head'>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Mobile Number</th>
          </tr>
        </thead>
        <tbody className='body'>
          {tableData.map((data, index) => (
            <tr key={index}>
              <td>{data.firstName}</td>
              <td>{data.lastName}</td>
              <td>{data.address}</td>
              <td>{data.pincode}</td>
              <td>{data.mobileNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyForm;
