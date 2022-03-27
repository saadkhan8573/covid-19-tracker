import React from 'react';

export default function Navbar() {

    return (
        <div className="flex justify-between items-center bg">
            <h1>Covid 19 Tracker</h1>
            <div >
                <select name="" id="" className="bg-none block  pl-3 pr-10 py-2 transition duration-100 ease-in-out border rounded shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed">
                    <option value="">World Wide</option>
                    <option value="">USA</option>
                    <option value="">Pakistan</option>
                    <option value="">UK</option>
                    <option value="">Canada</option>
                </select>
            </div>
        </div>
    );
}