import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
    const [item, setItem] = useState({ name: '', price: '' });
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const addItem = async (e) => {
        e.preventDefault();
        const uri = 'http://localhost:8000/items';

        try {
            await axios.post(uri, item);
            setSuccessMessage('Item added successfully!');
            setTimeout(() => {
                setSuccessMessage('');
                navigate('/');
            }, 1000);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setItem(prevItem => ({ ...prevItem, [name]: value }));
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-gradient-primary text-white">
                    <h1 className="card-title">Create An Item</h1>
                </div>
                <div className="card-body">
                    {successMessage && (
                        <div className="alert alert-success">
                            {successMessage}
                        </div>
                    )}
                    <form onSubmit={addItem}>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <label htmlFor="itemName" className="form-label">Item Name:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="itemName"
                                    name="name"
                                    value={item.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter item name"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="itemPrice" className="form-label">Item Price:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="itemPrice"
                                    name="price"
                                    value={item.price}
                                    onChange={handleInputChange}
                                    placeholder="Enter item price"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-4 text-center">
                            <button type="submit" className="btn btn-primary px-4">
                                <i className="bi bi-plus-lg"></i> Add Item
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 d-flex justify-content-start">
                        <button onClick={() => navigate('/')} className="btn btn-outline-secondary">
                            <i className="bi bi-arrow-left-circle"></i> Return to Items List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Create;