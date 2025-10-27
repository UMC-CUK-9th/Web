import type { Cast } from "../types/credit";

interface PeopleProps{
    people:Cast;
}
const People = ({people}:PeopleProps) => {

    return (
        <div className="flex flex-col items-center text-center">
            {people.profile_path ? (
                <img src={`https://image.tmdb.org/t/p/original${people.profile_path}`} 
                    className="w-20 h-20 object-cover rounded-full mb-2"
            />
            ):(
                <div className="w-20 h-20 rounded-full bg-black"></div>
            )}

            <p>{people.name}</p>
            <p className="text-gray-500 text-xs">{people.character}</p>
        </div>
    );

};

export default People;