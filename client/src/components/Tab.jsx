
import React from "react";

export default function Tab({ tablist, activeTab, handleTabChange }) {
    return (
        <div className="bg-white/80 backdrop-blur-md sticky top-2 z-10 border-b border-gray-200 shadow-sm rounded-xl">
            <div className="max-w-7xl mx-auto">
                {/* Mobile: Dropdown Style */}
                <div className="lg:hidden px-4 py-3">
                    <select
                        value={activeTab.toLowerCase()}
                        onChange={(e) => handleTabChange(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    >
                        {tablist.map((tab) => (
                            <option key={tab} value={tab.toLowerCase()}>
                                {tab}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Desktop: Horizontal Tabs */}
                <div className="hidden lg:flex items-center gap-1 px-2 overflow-x-auto scrollbar-hide">
                    {tablist.map((tab) => {
                        const isSelected = activeTab.toLowerCase() === tab.toLowerCase();

                        return (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab.toLowerCase())}
                                className={`relative py-3 px-6 text-sm font-semibold transition-all duration-300 whitespace-nowrap group ${isSelected
                                        ? "text-blue-600"
                                        : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                {tab}

                                {/* Active indicator */}
                                <span
                                    className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 ${isSelected
                                            ? "opacity-100 scale-x-100"
                                            : "opacity-0 scale-x-0 group-hover:opacity-50 group-hover:scale-x-100"
                                        }`}
                                />

                                {/* Hover background */}
                                <span
                                    className={`absolute inset-0 bg-blue-50 rounded-t-lg transition-all duration-300 -z-10 ${isSelected
                                            ? "opacity-100"
                                            : "opacity-0 group-hover:opacity-100"
                                        }`}
                                />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
