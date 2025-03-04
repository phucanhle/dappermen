export default function Favourites() {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">
                Favourites
            </h1>
            <div className="bg-white shadow-md rounded-lg p-4">
                {/* Add your favourite items here */}
                <p className="text-gray-500">
                    No favourites added yet.
                </p>
            </div>
        </div>
    );
}
