import React, { useState } from 'react';
import { ArrowRightLeft, Calendar, Users, ChevronDown } from 'lucide-react';

const SearchForm = () => {
    const [isReturn, setIsReturn] = useState(true);
    const [passengers, setPassengers] = useState(1);

    return (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                {/* From */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                    <div className="relative">
                        <div className="flex items-center p-3 border rounded-lg bg-gray-50">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                            <span className="text-gray-900 font-medium">London St Pancras</span>
                        </div>
                    </div>
                </div>

                {/* Swap button */}
                <div className="md:col-span-1 flex justify-center">
                    <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                        <ArrowRightLeft className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* To */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                    <div className="relative">
                        <div className="flex items-center p-3 border rounded-lg">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                            <span className="text-gray-900 font-medium">Berlin Hbf</span>
                        </div>
                    </div>
                </div>

                {/* Departure Date */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Departure Date</label>
                    <div className="relative">
                        <div className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-gray-900">We 11 Sep - Fr 20 Sep</span>
                            <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                        </div>
                    </div>
                </div>

                {/* Return toggle */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Return</label>
                    <div className="flex items-center">
                        <button
                            onClick={() => setIsReturn(!isReturn)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isReturn ? 'bg-blue-600' : 'bg-gray-200'
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isReturn ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                            />
                        </button>
                    </div>
                </div>

                {/* Passengers and Seat Class */}
                <div className="md:col-span-1 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setPassengers(Math.max(1, passengers - 1))}
                                className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-50"
                            >
                                -
                            </button>
                            <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {passengers} adult
                            </span>
                            <button
                                onClick={() => setPassengers(passengers + 1)}
                                className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-50"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Seat class</label>
                        <div className="relative">
                            <select className="w-full p-2 border rounded-lg appearance-none bg-white">
                                <option>Business</option>
                                <option>Economy</option>
                                <option>First</option>
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchForm;