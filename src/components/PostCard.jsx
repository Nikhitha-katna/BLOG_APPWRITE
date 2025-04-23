import React from 'react';
import service from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    // Fetch the file preview URL
    const imageUrl = service.getFileView(featuredImage);

    // Log image URL for debugging
    console.log("Image URL:", imageUrl);

    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-gray-100 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    {/* Image rendering with error handling */}
                    <img
                        src={imageUrl}
                        alt={title}
                        className="rounded-xl"
                        onError={() => console.error("Image failed to load")} // Log errors
                    />
                </div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
