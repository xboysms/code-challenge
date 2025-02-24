import React, { useState } from "react";
import { Link } from "react-router";

const Index: React.FC = () => {
    return (<div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg relative">
        <Link to="/" className="hover:text-amber-300">Go Back</Link>

        <h1 className="text-2xl font-semibold text-gray-800">Problem 5: A Crude Server</h1>
        <p className="mt-2 text-gray-600">Please run this server on a seperate project.</p>
    </div>);
};
export default Index;