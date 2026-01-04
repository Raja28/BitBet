import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../components/Loader";
import { useSearchParams } from "react-router-dom";
import Tab from "../components/Tab";
import { Trophy } from "lucide-react";
import GameCard from "../components/GameCard";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const tablist = ["All", "Cricket", "Football", "Tennis"];

export const HomePage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // Get the current tab from URL, default to 'all'
    const activeTab = searchParams.get("filter") || "all";

    useEffect(() => {
        async function fetchGames() {
            setLoading(true);
            setError(null);
            try {
                const filterValue = searchParams.get("filter");

                const response = await axios.get(`${BASE_URL}/api/games`, {
                    
                    params: filterValue ? { filter: filterValue } : {},
                    withCredentials: true
                });
                setGames(response.data.data);
            } catch (err) {
                const errorMessage = err.response?.data?.message || "Error fetching games.";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        }
        fetchGames();
    }, [searchParams])

    const handleTabChange = (tabName) => {
        setSearchParams({ filter: tabName });
    };

    return (
        <>
            <Tab tablist={tablist} activeTab={activeTab} handleTabChange={handleTabChange} />
            <div className="my-4 min-h-screen bg-white/80 rounded-xl">
                {loading && <div className="min-h-screen w-full flex justify-center items-center"><Loader /></div>}
                {error && <div className="min-h-screen w-full flex justify-center items-center"><p>{error}</p></div>}

                {
                    !loading && !error && <section>
                        {
                            <section className="p-4 md:p-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                                    {games?.length > 0 ? (
                                        games.map((game) => (
                                            <GameCard key={game.id} game={game} />
                                        ))
                                    ) : (
                                        <div className="col-span-full flex flex-col items-center justify-center py-20">
                                            <div className="bg-gray-100 p-6 rounded-full mb-4">
                                                <Trophy size={48} className="text-gray-300" />
                                            </div>
                                            <p className="text-gray-500 font-medium text-lg">No matches found for this category.</p>
                                            <button
                                                onClick={() => setSearchParams({ filter: 'all' })}
                                                className="mt-4 text-blue-600 font-semibold hover:underline"
                                            >
                                                View all games
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </section>
                        }
                    </section>
                }
            </div>
        </>
    )
}