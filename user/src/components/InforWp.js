import React, { useState } from 'react';
// Import send_socketIo from the appropriate file
import { send_socketIo } from '../services/socketIo';

const InforWp = ({ paths, onPathChange }) => {
    const [newPath, setNewPath] = useState({ lat: '', lng: '', speed: '1', alt: '10', mode: 'none' });
    const [isRunning, setIsRunning] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPath({
            ...newPath,
            [name]: value,
        });
    };

    const handleAddPath = () => {
        const updatedPaths = [...paths, {
            ...newPath,
            lat: parseFloat(newPath.lat) || 0,
            lng: parseFloat(newPath.lng) || 0,
            speed: parseFloat(newPath.speed) || 1,  // Default speed is 1
            alt: parseFloat(newPath.alt) || 10,     // Default altitude is 30
            mode: newPath.mode || 'none'
        }];
        onPathChange(updatedPaths);
        setNewPath({ lat: '', lng: '', speed: '1', alt: '10', mode: 'none' });  // Reset with default values
    };

    const handleRemovePath = (index) => {
        const updatedPaths = paths.filter((_, i) => i !== index);
        onPathChange(updatedPaths);
    };

    const handleEditPath = (index, field, value) => {
        const updatedPaths = paths.map((path, i) =>
            i === index ? { ...path, [field]: field === 'speed' || field === 'alt' ? parseFloat(value) || (field === 'speed' ? 1 : 30) : value } : path
        );
        onPathChange(updatedPaths);
    };

    const handleRunPath = (path) => {
        const pathData = {
            lat: parseFloat(path.lat) || 0,
            lng: parseFloat(path.lng) || 0,
            speed: parseFloat(path.speed) || 1,  // Default speed is 1
            alt: parseFloat(path.alt) || 10,     // Default altitude is 30
            mode: path.mode || 'none'
        };
        send_socketIo("controlMsg", "drone", "run_wp", pathData);
        console.log('Running path:', pathData);
    };

    const handleSendAll = () => {
        const updatedPaths = paths.map(path => ({
            lat: parseFloat(path.lat) || 0,
            lng: parseFloat(path.lng) || 0,
            speed: parseFloat(path.speed) || 1,  // Ensure default speed is sent
            alt: parseFloat(path.alt) || 10,     // Ensure default altitude is sent
            mode: path.mode || 'none'
        }));

        send_socketIo("controlMsg", "drone", "run_all_wp", updatedPaths);
        console.log('Sending all waypoints:', updatedPaths);
    };

    const handleRunStart = () => {
        const newValue = !isRunning;
        setIsRunning(newValue);
        send_socketIo("controlMsg", "drone", "run_start_wp", newValue);
        console.log('Running start waypoint with value:', newValue);
    };

    return (
        <div style={{ width: 'min-content' }}>
            <div>
                <h4>Add New Path</h4>
                <input
                    type="text"
                    name="lat"
                    placeholder="Latitude"
                    value={newPath.lat}
                    onChange={handleInputChange}
                    style={{ width: 'auto' }}
                />
                <input
                    type="text"
                    name="lng"
                    placeholder="Longitude"
                    value={newPath.lng}
                    onChange={handleInputChange}
                    style={{ width: 'auto' }}
                />
                <input
                    type="text"
                    name="speed"
                    placeholder="Speed"
                    value={newPath.speed}
                    onChange={handleInputChange}
                    style={{ width: '64px' }}
                />
                <input
                    type="text"
                    name="alt"
                    placeholder="Alt"
                    value={newPath.alt}
                    onChange={handleInputChange}
                    style={{ width: '64px' }}

                />
                {/* <select
                    name="mode"
                    value={newPath.mode}
                    onChange={handleInputChange}
                    style={{ width: '64px' }}
                >
                    <option value="none">None</option>
                    <option value="home">Home</option>
                    <option value="coffee">Coffee</option>
                </select> */}
                <button onClick={handleAddPath}>Add Path</button>
            </div>
            <h3>Paths Table</h3>
            <table>
                <thead>
                    <tr>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Speed (m/s)</th>
                        <th>Alt (m)</th>
                        {/* <th>Mode</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paths.map((path, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    value={path.lat || ''}
                                    onChange={(e) => handleEditPath(index, 'lat', e.target.value)}
                                    style={{ width: 'auto' }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={path.lng || ''}
                                    onChange={(e) => handleEditPath(index, 'lng', e.target.value)}
                                    style={{ width: 'auto' }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={path.speed || '1'}  // Default speed is 1
                                    onChange={(e) => handleEditPath(index, 'speed', e.target.value)}
                                    style={{ width: '64px' }}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={path.alt || '10'}   // Default altitude is 10
                                    onChange={(e) => handleEditPath(index, 'alt', e.target.value)}
                                    style={{ width: '64px' }}
                                />
                            </td>
                            {/* <td>
                                <select
                                    value={path.mode || 'none'}
                                    onChange={(e) => handleEditPath(index, 'mode', e.target.value)}
                                    style={{ width: '64px' }}
                                >
                                    <option value="none">None</option>
                                    <option value="home">Home</option>
                                    <option value="coffee">Coffee</option>
                                </select>
                            </td> */}
                            <td>
                                <button onClick={() => handleRemovePath(index)}>Remove</button>
                                <button onClick={() => handleRunPath(path)}>Run</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            <div>
                <button onClick={handleSendAll}>Send All Waypoints</button>
                <button onClick={handleRunStart}>
                    {isRunning ? "Stop Start Waypoint" : "Run Start Waypoint"}
                </button>
            </div>
        </div>
    );
};

export default InforWp;

