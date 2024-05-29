import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";

function Users() {
    const { id } = useParams();

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3001/')
            .then(res => {
                console.log(res);
                setData(res.data); 
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            axios.delete('http://localhost:3001/deleteuser/' + id)
                .then(res => {
                    console.log(res);
                    alert("User deleted successfully");
                    window.location.reload(); // Reload the page
                })
                .catch(err => console.log(err));
        }
    }

    const filteredData = data.filter((user) => 
        (user.name && user.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.age && user.age.toString().includes(searchQuery))
    );

    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3">
                <div className="row justify-content-center align-items-center mb-3">
                    <div className="col-auto">
                        <Link to="/create" className="btn btn-success btn-sm mr-2">
                            Add +
                        </Link>
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            placeholder="Search by name"
                            className="form-control mt-1"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <table className="table">
                    <thead> 
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((user, index) => (
                            <tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.age}</td>
                                <td>
                                    {user._id && (
                                        <Link to={`/edit/${user._id}`} className="btn btn-sm btn-success me-2">Update</Link>
                                    )}
                                    <button onClick={() => handleDelete(user._id)} className="btn btn-sm btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;