/* This example requires Tailwind CSS v2.0+ */
export default function Badges(name, colour) {
    return (
        <>
            {colour === "black" && (
                <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    {name}
                </span>
            )}
            {colour === "red" && (
                <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                    {name}
                </span>
            )}
            {colour === "yellow" && (
                <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                    {name}
                </span>
            )}
            {colour === "green" && (
                <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {name}
                </span>
            )}
            {colour === "blue" && (
                <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {name}
                </span>
            )}
            {colour === "indigo" && (
                <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                    {name}
                </span>
            )}
            {colour === "purple" && (
                <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                    {name}
                </span>
            )}
            {colour === "pink" && (
                <span className="inline-flex items-center rounded-full bg-pink-100 px-2.5 py-0.5 text-xs font-medium text-pink-800">
                    {name}
                </span>
            )}
        </>
    );
}
