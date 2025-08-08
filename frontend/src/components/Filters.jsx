import React, { useState } from 'react';
import { RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

const Filters = () => {
    const [departureTime, setDepartureTime] = useState([420, 1080]); // 07:00 to 18:00 in minutes
    const [selectedHour, setSelectedHour] = useState('07');
    const [selectedMinute, setSelectedMinute] = useState('00');
    const [isTimeExpanded, setIsTimeExpanded] = useState(true);
    const [isFacilitiesExpanded, setIsFacilitiesExpanded] = useState(true);

    const [facilities, setFacilities] = useState({
        wifi: true,
        socket: true,
        meal: false,
        television: false
    });

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    };

    const handleFacilityChange = (facility) => {
        setFacilities(prev => ({
            ...prev,
            [facility]: !prev[facility]
        }));
    };

    return (
        <div className="w-64 bg-white rounded-lg shadow-sm border p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button className="text-blue-600 text-sm hover:text-blue-700 flex items-center">
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                </button>
            </div>

            {/* Time Filter */}
            <div className="mb-6">
                <button
                    onClick={() => setIsTimeExpanded(!isTimeExpanded)}
                    className="flex justify-between items-center w-full text-left"
                >
                    <h4 className="font-medium text-gray-900">Time</h4>
                    {isTimeExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isTimeExpanded && (
                    <div className="mt-4">
                        <div className="mb-4">
                            <label className="block text-sm text-gray-700 mb-2">Departure date</label>
                            <div className="flex space-x-2">
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-600 mr-2">{formatTime(departureTime[0])}</span>
                                    <span className="text-sm text-gray-600 mr-2">PM</span>
                                </div>
                                <div className="text-sm text-gray-400">→</div>
                                <div className="flex items-center">
                                    <span className="text-sm text-gray-600 mr-2">{formatTime(departureTime[1])}</span>
                                    <span className="text-sm text-gray-600">PM</span>
                                </div>
                            </div>

                            {/* Time Range Slider */}
                            <div className="mt-3 relative">
                                <div className="w-full h-2 bg-gray-200 rounded"></div>
                                <div
                                    className="absolute h-2 bg-blue-600 rounded"
                                    style={{
                                        left: `${(departureTime[0] - 360) / 720 * 100}%`,
                                        width: `${(departureTime[1] - departureTime[0]) / 720 * 100}%`
                                    }}
                                ></div>
                                <input
                                    type="range"
                                    min="360"
                                    max="1440"
                                    value={departureTime[0]}
                                    onChange={(e) => setDepartureTime([parseInt(e.target.value), departureTime[1]])}
                                    className="absolute w-full h-2 opacity-0 cursor-pointer"
                                />
                                <input
                                    type="range"
                                    min="360"
                                    max="1440"
                                    value={departureTime[1]}
                                    onChange={(e) => setDepartureTime([departureTime[0], parseInt(e.target.value)])}
                                    className="absolute w-full h-2 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-700 mb-2">Select time</label>
                            <div className="flex space-x-2">
                                <div className="flex-1">
                                    <select
                                        value={selectedHour}
                                        onChange={(e) => setSelectedHour(e.target.value)}
                                        className="w-full p-2 border rounded text-center bg-blue-600 text-white"
                                    >
                                        {Array.from({ length: 24 }, (_, i) => (
                                            <option key={i} value={i.toString().padStart(2, '0')}>
                                                {i.toString().padStart(2, '0')}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <span className="self-center">:</span>
                                <div className="flex-1">
                                    <select
                                        value={selectedMinute}
                                        onChange={(e) => setSelectedMinute(e.target.value)}
                                        className="w-full p-2 border rounded text-center"
                                    >
                                        {['00', '15', '30', '45'].map(minute => (
                                            <option key={minute} value={minute}>{minute}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex-1">
                                    <select className="w-full p-2 border rounded text-center">
                                        <option>PM</option>
                                        <option>AM</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Price histogram placeholder */}
                        <div className="mt-4">
                            <div className="flex items-end justify-between h-16 space-x-1">
                                {Array.from({ length: 20 }, (_, i) => (
                                    <div
                                        key={i}
                                        className="bg-blue-200 rounded-t flex-1"
                                        style={{ height: `${Math.random() * 60 + 10}px` }}
                                    ></div>
                                ))}
                            </div>
                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>$400</span>
                                <span>$600</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Facilities Filter */}
            <div>
                <button
                    onClick={() => setIsFacilitiesExpanded(!isFacilitiesExpanded)}
                    className="flex justify-between items-center w-full text-left mb-4"
                >
                    <h4 className="font-medium text-gray-900">Facilities</h4>
                    {isFacilitiesExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {isFacilitiesExpanded && (
                    <div className="space-y-3 mb-6">
                        {Object.entries(facilities).map(([facility, checked]) => (
                            <label key={facility} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => handleFacilityChange(facility)}
                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700 capitalize">
                                    {facility === 'wifi' ? 'Wi-Fi' : facility}
                                </span>
                            </label>
                        ))}
                    </div>
                )}
            </div>

            <button className="w-full bg-gray-800 text-white py-3 px-4 rounded-lg hover:bg-gray-900 transition-colors">
                Apply Filters
            </button>
        </div>
    );
};

export default Filters;