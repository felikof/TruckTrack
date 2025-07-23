import React from "react";
import "./App.css";
import Dashboard from "./pages/dashboard";

function App() {
    return (
        <div className="App">
            <header className="navbar">
                <h1>Port Dashboard</h1>
            </header>
            <main className="container">
                <Dashboard />
            </main>
        </div>
    );
}

export default App;
