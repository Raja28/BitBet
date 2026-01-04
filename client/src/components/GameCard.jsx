
import axios from "axios";
import { Calendar, Clock, Trophy, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToFavoritesSuccess, removeFromFavoritesSuccess } from "../store/authSlice";

const GameCard = ({ game }) => {

    const { user: { favorites } } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const isFavorite = favorites?.some(
        (fav) => fav.match_id === game.id
    );

    const date = new Date(game.start_time).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
    });
    const time = new Date(game.start_time).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
    });

    const toggleFavorite = async (gameId) => {
        const endPoint = `${import.meta.env.VITE_BACKEND_URL}/api/favorites/${gameId}`;
        const method = isFavorite ? "DELETE" : "POST";
        try {
            const resp = await axios({
                method,
                url: endPoint,
                // data: { gameId },
                withCredentials: true,
            });

            if (resp.status === 200) {
                dispatch(removeFromFavoritesSuccess(gameId));
                toast.success("Removed from favorites");
            }

            if (resp.status === 201) {
                dispatch(addToFavoritesSuccess(resp.data.data));
                toast.success("Added to favorites");
            }
        } catch (error) {
            console.error(error);
            const errmsg = error.response.data.message;
            toast.error(errmsg);
        }
    };

    return (
        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">

            {/* Thumbnail Container */}
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={game.thumbnail}
                    alt={`${game.team_a} vs ${game.team_b}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-black/30" />

                {/* TOP LEFT: Badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                    {game.is_live && (
                        <span className="flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
                            <span className="w-1.5 h-1.5 bg-white rounded-full" /> LIVE
                        </span>
                    )}
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                        {game.sport}
                    </span>
                </div>

                {/* TOP RIGHT: Favorite Button */}
                <button
                    onClick={() => toggleFavorite(game.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 transition-all duration-300 hover:bg-white/40 active:scale-90 group/heart"
                >
                    <Heart
                        size={16}
                        className={`transition-colors duration-300 ${isFavorite
                            ? "fill-rose-500 text-rose-500"
                            : "text-white group-hover/heart:text-rose-300"
                            }`}
                    />
                </button>

                {/* BOTTOM LEFT: League Tag */}
                <div className="absolute bottom-3 left-3 text-white">
                    <p className="text-xs font-medium flex items-center gap-1 opacity-90">
                        <Trophy size={12} className="text-yellow-400" /> {game.league}
                    </p>
                </div>
            </div>

            {/* Details Section */}
            <div className="p-4 flex flex-col grow">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-col items-center text-center w-[40%]">
                        <p className="text-xs font-bold text-gray-800 line-clamp-2 h-10 flex items-center justify-center">
                            {game.team_a}
                        </p>
                    </div>
                    <span className="text-xs font-black text-gray-300 italic">VS</span>
                    <div className="flex flex-col items-center text-center w-[40%]">
                        <p className="text-xs font-bold text-gray-800 line-clamp-2 h-10 flex items-center justify-center">
                            {game.team_b}
                        </p>
                    </div>
                </div>

                {/* Date and Time Footer */}
                <div className="mt-auto pt-3 border-t border-gray-50 flex justify-between items-center text-gray-500">
                    <div className="flex items-center gap-1 text-[11px] font-medium">
                        <Calendar size={14} className="text-blue-500" /> <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-medium">
                        <Clock size={14} className="text-blue-500" /> <span>{time}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameCard;