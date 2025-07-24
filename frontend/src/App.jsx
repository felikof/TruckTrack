import React from "react";
import "./App.css";
import Dashboard from "./pages/dashboard";
import AdminNavbar from "./components/AdminNavbar";

function App() {
    return (
        <div className="App">
            <header className="navbar">
                <AdminNavbar/>
            </header>
            <main className="container">
                <Dashboard />
            </main>
        </div>
    );
}

export default App;
