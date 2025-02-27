// import { Verified } from 'lucide-react'
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Lost = () => {
//     const [items, setItems] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const navigate = useNavigate();

//     useEffect(() => {
//         axios.get('/api/lost-items')
//             .then(response => setItems(response.data))
//             .catch(error => console.error('Error fetching lost items:', error));
//     }, []);

//     // const filteredItems = items.filter(item =>
//     //     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//     // );

//     return (
//         <div >
//             <h2>Lost Items</h2>
//             <input
//                 type="text"
//                 placeholder="Search lost items..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <button onClick={() => navigate('/report')}>Report Lost Item</button>
//             <div>
//                 {/* {filteredItems.length > 0 ? (
//                     filteredItems.map(item => (
//                         <div key={item._id}>
//                             <h3>{item.name}</h3>
//                             <p>{item.description}</p>
//                             <button onClick={() => navigate(`/verify/${item._id}`)}>Verification</button>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No lost items found.</p>
//                 )} */}
//             </div>
//         </div>
//     );
// };

// export default Lost;

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

    

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6 text-center">Lost Items</h2>
            
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-10">
                <div className="w-full md:w-1/2 flex justify-end">
                    <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
                        placeholder="Search lost items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div>
                    <button className="bg-blue-500 text-black px-6 py-3 rounded-lg shadow-md hover:bg-blue-600" onClick={() => navigate('/report')}>
                        Report Lost Item
                    </button>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
            </div>
        </div>
    );
};

export default Lost;