import React from 'react';
import { MapPin, Wifi, Zap, Coffee, Tv } from 'lucide-react';

const TrainResults = () => {
    const trainResults = [
        {
            id: 1,
            operator: 'British Rail',
            operatorLogo: '🚄',
            departureTime: '07:04',
            arrivalTime: '17:04',
            duration: '9h 0m',
            departure: 'London St Pancras',
            arrival: 'Berlin Hbf',
            departureDate: 'We 11 Sep',
            arrivalDate: 'We 11 Sep',
            stops: [
                { time: '10:05', location: 'Brussels-Midi', transfer: '20m transfer time', class: 'ICE 15, 08' },
                { time: '10:25', location: 'Brussels-Midi', transfer: '', class: '' },
                { time: '12:15', location: 'Köln Hbf', transfer: '30m transfer time', class: 'ICE 559, 08' },
                { time: '12:45', location: 'Köln Hbf', transfer: '', class: '' }
            ],
            price: '$420',
            facilities: ['socket', 'meal', 'wifi', 'tv'],
            tag: 'Cheapest'
        },
        {
            id: 2,
            operator: 'Eurostar',
            operatorLogo: '⭐',
            departureTime: '14:30',
            arrivalTime: '22:40',
            duration: '8h 10m',
            departure: 'Berlin Hbf',
            arrival: 'London St Pancras',
            departureDate: 'Fr 20 Sep',
            arrivalDate: 'We 20 Sep',
            stops: [
                { time: '16:20', location: 'Köln Hbf', transfer: '', class: 'ICE 559, 08' },
                { time: '16:55', location: 'Köln Hbf', transfer: '30m transfer time', class: '' },
                { time: '20:15', location: 'Brussels-Midi', transfer: '', class: 'ICE 15, 08' }
            ],
            price: '$350',
            facilities: ['socket', 'wifi', 'tv'],
            tag: 'Recommended'
        }
    ];

    const getFacilityIcon = (facility) => {
        switch (facility) {
            case 'socket': return <Zap className="w-4 h-4" />;
            case 'meal': return <Coffee className="w-4 h-4" />;
            case 'wifi': return <Wifi className="w-4 h-4" />;
            case 'tv': return <Tv className="w-4 h-4" />;
            default: return null;
        }
    };

    return (
        <div className="flex-1 space-y-4">
            {/* Results header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">Cheapest</span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-sm">Recommended</span>
                    <span className="text-sm text-gray-600">23 seats left</span>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="p-2 border rounded hover:bg-gray-50">📋</button>
                    <button className="p-2 border rounded hover:bg-gray-50">📥</button>
                    <button className="p-2 border rounded hover:bg-gray-50">⬆️</button>
                </div>
            </div>

            {/* Train results */}
            {trainResults.map((train) => (
                <div key={train.id} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                <span className="text-red-600 text-xs font-bold">BR</span>
                            </div>
                            <div>
                                <h3 className="font-medium text-gray-900">{train.operator}</h3>
                                <p className="text-sm text-gray-500">Duration {train.duration}</p>
                            </div>
                        </div>
                        <span className="text-2xl font-bold text-gray-900">{train.price}</span>
                    </div>

                    <div className="grid grid-cols-5 items-center mb-4">
                        {/* Departure */}
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{train.departureTime}</div>
                            <div className="text-sm text-gray-600">{train.departure}</div>
                            <div className="text-xs text-gray-500">{train.departureDate}</div>
                        </div>

                        {/* Route visualization */}
                        <div className="col-span-3">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    {train.stops.map((stop, index) => (
                                        <React.Fragment key={index}>
                                            <div className="flex-1 h-px bg-gray-300"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                        </React.Fragment>
                                    ))}
                                    <div className="flex-1 h-px bg-gray-300"></div>
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                </div>
                            </div>

                            <div className="flex justify-between text-xs text-gray-500 mb-2">
                                {train.stops.slice(0, 3).map((stop, index) => (
                                    <div key={index} className="text-center">
                                        <div className="font-medium">{stop.time}</div>
                                        <div>{stop.location}</div>
                                        {stop.transfer && <div className="text-red-500">{stop.transfer}</div>}
                                        {stop.class && <div className="text-blue-600">{stop.class}</div>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Arrival */}
                        <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{train.arrivalTime}</div>
                            <div className="text-sm text-gray-600">{train.arrival}</div>
                            <div className="text-xs text-gray-500">{train.arrivalDate}</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            {train.facilities.map((facility, index) => (
                                <div key={index} className="flex items-center text-gray-500">
                                    {getFacilityIcon(facility)}
                                    <span className="ml-1 text-xs capitalize">{facility}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-blue-600 text-sm">/ includes tax & fees</span>
                            <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors">
                                Select
                            </button>
                        </div>
                    </div>

                    {train.tag && (
                        <div className="mt-2 flex justify-end">
                            <span className={`px-2 py-1 rounded text-xs ${train.tag === 'Cheapest' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                                }`}>
                                {train.tag}
                            </span>
                        </div>
                    )}
                </div>
            ))}

            {/* Additional result */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-600 text-xs font-bold">BR</span>
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900">British Rail</h3>
                            <p className="text-sm text-gray-500">Duration 8h 50m</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-gray-900">$770</span>
                        <p className="text-xs text-gray-500">/ includes tax & fees</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">Popular</span>
                    <span className="text-sm text-gray-600">11 seats left</span>
                </div>

                <div className="flex justify-end">
                    <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900 transition-colors">
                        Select
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TrainResults;