import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // In a real application, fetch users from the API
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // This would be an actual API call in a real application
        // const response = await axios.get('/api/admin/users/');
        // setUsers(response.data);
        
        // Mock data for demonstration
        setTimeout(() => {
          const mockUsers = [
            { id: 1, username: 'johndoe', email: 'john@example.com', first_name: 'John', last_name: 'Doe', date_joined: '2025-01-15', is_staff: false, is_active: true },
            { id: 2, username: 'janedoe', email: 'jane@example.com', first_name: 'Jane', last_name: 'Doe', date_joined: '2025-01-20', is_staff: false, is_active: true },
            { id: 3, username: 'bobsmith', email: 'bob@example.com', first_name: 'Bob', last_name: 'Smith', date_joined: '2025-02-05', is_staff: false, is_active: true },
            { id: 4, username: 'alicejones', email: 'alice@example.com', first_name: 'Alice', last_name: 'Jones', date_joined: '2025-02-10', is_staff: false, is_active: false },
            { id: 5, username: 'mikebrown', email: 'mike@example.com', first_name: 'Mike', last_name: 'Brown', date_joined: '2025-03-01', is_staff: false, is_active: true },
            { id: 6, username: 'sarahlee', email: 'sarah@example.com', first_name: 'Sarah', last_name: 'Lee', date_joined: '2025-03-15', is_staff: false, is_active: true },
            { id: 7, username: 'davidwilson', email: 'david@example.com', first_name: 'David', last_name: 'Wilson', date_joined: '2025-03-20', is_staff: false, is_active: true },
            { id: 8, username: 'emmajohnson', email: 'emma@example.com', first_name: 'Emma', last_name: 'Johnson', date_joined: '2025-04-05', is_staff: false, is_active: true },
            { id: 9, username: 'admin', email: 'admin@example.com', first_name: 'Admin', last_name: 'User', date_joined: '2025-01-01', is_staff: true, is_active: true },
          ];
          setUsers(mockUsers);
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again.');
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      // This would be an actual API call in a real application
      // await axios.patch(`/api/admin/users/${userId}/`, { is_active: !currentStatus });
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, is_active: !currentStatus } : user
      ));
      
      alert(`User status updated successfully`);
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Failed to update user status. Please try again.');
    }
  };
  
  const handleToggleStaff = async (userId, currentStaffStatus) => {
    try {
      // This would be an actual API call in a real application
      // await axios.patch(`/api/admin/users/${userId}/`, { is_staff: !currentStaffStatus });
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, is_staff: !currentStaffStatus } : user
      ));
      
      alert(`User staff status updated successfully`);
    } catch (error) {
      console.error('Error updating user staff status:', error);
      alert('Failed to update user staff status. Please try again.');
    }
  };
  
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }
  
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Users Management</h2>
        <button className="btn btn-outline-primary">
          <i className="bi bi-person-plus me-1"></i> Add New User
        </button>
      </div>
      
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date Joined</th>
                  <th>Staff</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{`${user.first_name} ${user.last_name}`}</td>
                    <td>{user.email}</td>
                    <td>{user.date_joined}</td>
                    <td>
                      <div className="form-check form-switch">
                        <input 
                          className="form-check-input" 
                          type="checkbox" 
                          checked={user.is_staff}
                          onChange={() => handleToggleStaff(user.id, user.is_staff)}
                          disabled={user.username === 'admin'} // Prevent changing the main admin
                        />
                      </div>
                    </td>
                    <td>
                      <span className={`badge ${user.is_active ? 'bg-success' : 'bg-danger'}`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group">
                        <button className="btn btn-sm btn-outline-primary me-2">
                          View
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={() => handleToggleStatus(user.id, user.is_active)}
                          disabled={user.username === 'admin'} // Prevent disabling the main admin
                        >
                          {user.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button className="btn btn-sm btn-outline-danger">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
