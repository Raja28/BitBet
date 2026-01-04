import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Loader from "../components/Loader";
import GameCard from "../components/GameCard";
import { Trophy } from "lucide-react";
import { useSelector } from "react-redux";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {user} = useSelector((state) => state.auth);


    useEffect(() => {
        const fetchFavorites = async () => {
            setError(null);
            setLoading(true);
            try {
                const resp = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/favorites`, {
                    withCredentials: true
                })
              
                setFavorites(resp.data.data);
            } catch (err) {
                const errorMessage = err.response?.data?.message || "Error fetching games.";
                console.error(errorMessage);
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        }
        fetchFavorites();
    }, [user]);

    return (
        <>
            <>
                <div className="my-4 min-h-screen bg-white/80 rounded-xl">
                    {loading && <div className="min-h-screen w-full flex justify-center items-center"><Loader /></div>}
                    {error && <div className="min-h-screen w-full flex justify-center items-center"><p>{error}</p></div>}

                    {
                        !loading && !error && <section>
                            {
                                <section className="p-4 md:p-8">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                                        {favorites?.length > 0 ? (
                                            favorites.map((game) => (
                                                <GameCard key={game.id} game={game} />
                                            ))
                                        ) : (
                                            <div className=" col-span-full flex flex-col items-center justify-center py-20">
                                                <div className="bg-blue-100 p-6 rounded-full mb-4">
                                                    <Trophy size={48} className="text-gray-300" />
                                                </div>
                                                <p className="text-gray-500 font-medium text-lg">No matches found for this category.</p>

                                            </div>
                                        )}
                                    </div>
                                </section>
                            }
                        </section>
                    }
                </div>
            </>
        </>
    )
}