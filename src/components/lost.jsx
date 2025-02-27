// import { Verified } from 'lucide-react'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Lost = () => {
    const [items, setItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/lost-items')
            .then(response => setItems(response.data))
            .catch(error => console.error('Error fetching lost items:', error));
    }, []);

    // const filteredItems = items.filter(item =>
    //     item.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );

    return (
        <div>
            <h2>Lost Items</h2>
            <input
                type="text"
                placeholder="Search lost items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => navigate('/report')}>Report Item</button>
            <div>
                {/* {filteredItems.length > 0 ? (
                    filteredItems.map(item => (
                        <div key={item._id}>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <button onClick={() => navigate(`/verify/${item._id}`)}>Verification</button>
                        </div>
                    ))
                ) : (
                    <p>No lost items found.</p>
                )} */}
            </div>
        </div>
    );
};

export default Lost;