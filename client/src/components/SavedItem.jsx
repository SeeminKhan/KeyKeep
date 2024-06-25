import React from "react";

const SavedItem = ({ savedItem, onDelete, onCopy, showPassword }) => {
  const handleCopy = () => {
    onCopy(savedItem);
    alert(`Copied: ${savedItem.website}, ${savedItem.username}, ${savedItem.password}`);
  };

  const handleDelete = () => {
    onDelete(savedItem._id);
    alert(`Deleted: ${savedItem.website}`);
  };

  return (
    <tr className="border-b">
      <td className="border px-4 py-2 text-center md:w-1/4">{savedItem.website}</td>
      <td className="border px-4 py-2 text-center md:w-1/4">{savedItem.username}</td>
      <td className="border px-4 py-2 text-center md:w-1/4">
        {showPassword ? savedItem.password : "********"}
      </td>
      <td className="border px-4 py-2 text-center md:w-1/4">
        <button
          className="w-full md:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none mb-2 md:mb-0 md:mr-2"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none"
          onClick={handleCopy}
        >
          Copy
        </button>
      </td>
    </tr>
  );
};

export default SavedItem;
