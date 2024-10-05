import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Index() {
    const [items, setItems] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemIdToDelete, setItemIdToDelete] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const uri = 'http://localhost:8000/items';
                const response = await axios.get(uri);
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

    const openDeleteConfirmation = (id) => {
        setItemIdToDelete(id);
        setShowDeleteModal(true);
    };

    const closeModal = () => {
        setShowDeleteModal(false);
    };

    const confirmDelete = async () => {
        if (itemIdToDelete !== null) {
            try {
                const uri = `http://localhost:8000/items/${itemIdToDelete}`;
                await axios.delete(uri);
                setItems(currentItems => currentItems.filter((item) => item.id !== itemIdToDelete));
                setSuccessMessage('Item deleted successfully!');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate('/'); // Replace '/' with your actual route name for the item list
                }, 1000);
                closeModal();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Items</h1>
            {successMessage && (
                <div className="alert alert-success">
                    {successMessage}
                </div>
            )}
            <div className="d-flex justify-content-end mb-4">
                <Link to="/create" className="btn btn-success"><i className="bi bi-plus-lg"></i> Create New Item</Link>
            </div>

            <div className="table-responsive">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Item Name</th>
                            <th scope="col">Item Price</th>
                            <th scope="col" style={{ width: "20%" }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>
                                    <Link to={`/edit/${item.id}`} className="btn btn-sm btn-outline-primary me-2">
                                        <i className="bi bi-pencil-square me-1"></i> Edit
                                    </Link>
                                    <Button variant="outline-danger" size="sm" onClick={() => openDeleteConfirmation(item.id)}>
                                        <i className="bi bi-trash me-1"></i> Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Cancel</Button>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Index;