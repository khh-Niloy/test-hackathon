import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
const CrimeDetailes = () => {
  const { id } = useParams();
  // const [crime, setCrime] = useState(null);
  // useEffect(() => {
  //   axios.get(`http://localhost:3000/crime-details/${id}`).then((res) => {
  //     setCrime(res.data);
  //   });
  // }, [id]);

  const { data: crime = [], refetch } = useQuery({
    queryKey: ["crime"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/crime-details/${id}`);
      return res.data;
    },
  });

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    data.crimeid = crime._id;
    // console.log(data)
    axios.post("http://localhost:3000/add-new-comment", data).then((res) => {
      console.log(res);
      refetch();
      refetchComments();
    });
  };

  const { data: allComments = [], refetch: refetchComments } = useQuery({
    queryKey: ["all-comments"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/all-comments");
      return res.data;
    },
  });
  return (
    <div className="w-[80%] mx-auto pb-32">
      <Link to="/">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Home
        </button>
      </Link>
      <h1>{crime?.title}</h1>
      <p>{crime?.description}</p>
      <p>{crime?.division}</p>
      <p>{crime?.district}</p>
      <img className="w-[20%]" src={crime?.image} alt="" />
      <p>post time: {new Date(crime?.postTime).toUTCString()}</p>
      <p>crime time: {new Date(crime?.crimeTime).toUTCString()}</p>
      <p>
        Post Verification Score:{" "}
        {crime?.postVerificationScore > 0 ? crime?.postVerificationScore : 0}
      </p>

      <h1 className="mt-5 font-semibold">Comment please</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="url"
          {...register("image", { required: true })}
          placeholder="picture url"
          className="w-full border-2 border-gray-300 rounded-md p-2"
        />
        <textarea
          {...register("comment")}
          className="w-full border-2 border-gray-300 rounded-md p-2"
          placeholder="Comment"
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Submit
        </button>
      </form>

      <h1 className="mt-5 font-semibold">All Comments</h1>
      {allComments.map((comment, key) => (
        <div key={key}>
          <p>{comment.comment}</p>
          <img className="w-[20%]" src={comment.image} alt="" />
        </div>
      ))}
    </div>
  );
};

export default CrimeDetailes;
