import React from 'react';
import { Settings, Bell, User } from 'lucide-react';

const Header = () => {
    return (
        <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">e</span>
                            </div>
                            <span className="ml-2 text-xl font-semibold text-gray-900">easyticket</span>
                        </div>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-4 px-1 text-sm font-medium">
                            Browse tickets
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-700 pb-4 px-1 text-sm font-medium">
                            My booking
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-700 pb-4 px-1 text-sm font-medium">
                            Scheduled
                        </a>
                        <a href="#" className="text-gray-500 hover:text-gray-700 pb-4 px-1 text-sm font-medium">
                            History
                        </a>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <Settings className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                        <Bell className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;