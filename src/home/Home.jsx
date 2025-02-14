import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {

  const { data: allCrime = [], refetch } = useQuery({
    queryKey: ["all-crime"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/all-crime");
      return res.data;
    },
  });

  const handleUpvote = (id) => {
    axios.patch(`http://localhost:3000/upvote-downvote/${id}`, {
      user: "upvote",
    }).then((res) => {
      console.log(res.data);
      refetch();
    });
  };

  const handleDownvote = (id) => {
    axios.patch(`http://localhost:3000/upvote-downvote/${id}`, {
      user: "downvote",
    }).then((res) => {
      console.log(res.data);
      refetch();
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/report-crime">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-lg hover:bg-indigo-700 transition-all duration-300 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Report Crime
          </button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mt-12">
          {allCrime.map((crime, key) => (
            <div
              key={key}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={crime.image}
                  alt={crime.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {crime.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {crime.description}
                </p>

                <div className="flex flex-col gap-4">
                  <Link to={`/crime-details/${crime._id}`}>
                    <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-300">
                      View Details
                    </button>
                  </Link>

                  <div className="flex gap-3">
                    {}
                    <button
                      onClick={() => handleUpvote(crime._id)}
                      className="flex-1 px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {crime.upvotes}
                    </button>
                    <button
                      onClick={() => handleDownvote(crime._id)}
                      className="flex-1 px-4 py-2 bg-rose-500 text-white rounded-lg font-medium hover:bg-rose-600 transition-colors duration-300 flex items-center justify-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {crime.downvotes}
                    </button>
                  </div>
                  <p>Post Verification Score: {crime.postVerificationScore > 0 ? crime.postVerificationScore : 0}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
