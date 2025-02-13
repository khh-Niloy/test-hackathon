import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../provider/AuthContextProvider";
import axios from "axios";

const ReportCrime = () => {
  const { register, handleSubmit, watch } = useForm();
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  const division = watch("division");

  const districtsByDivision = {
    Dhaka: [
      "Dhaka",
      "Gazipur",
      "Narayanganj",
      "Tangail",
      "Kishoreganj",
      "Narsingdi",
      "Manikganj",
      "Munshiganj",
      "Rajbari",
      "Madaripur",
      "Gopalganj",
      "Faridpur",
      "Shariatpur",
    ],
    Chittagong: [
      "Chittagong",
      "Cox's Bazar",
      "Rangamati",
      "Bandarban",
      "Khagrachari",
      "Feni",
      "Lakshmipur",
      "Comilla",
      "Noakhali",
      "Chandpur",
      "Brahmanbaria",
    ],
    Rajshahi: [
      "Rajshahi",
      "Natore",
      "Naogaon",
      "Chapainawabganj",
      "Pabna",
      "Bogra",
      "Sirajganj",
      "Joypurhat",
    ],
    Khulna: [
      "Khulna",
      "Bagerhat",
      "Satkhira",
      "Jessore",
      "Magura",
      "Jhenaidah",
      "Narail",
      "Kushtia",
      "Chuadanga",
      "Meherpur",
    ],
    Barisal: [
      "Barisal",
      "Bhola",
      "Barguna",
      "Pirojpur",
      "Patuakhali",
      "Jhalokati",
    ],
    Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
    Rangpur: [
      "Rangpur",
      "Dinajpur",
      "Kurigram",
      "Gaibandha",
      "Nilphamari",
      "Panchagarh",
      "Thakurgaon",
      "Lalmonirhat",
    ],
    Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
  };

  // Update districts when division changes
  useEffect(() => {
    if (division) {
      setFilteredDistricts(districtsByDivision[division] || []);
    } else {
      setFilteredDistricts([]);
    }
    console.log("Selected division:", division);
  }, [division]);

  const { user } = useContext(AuthContext);

  const onSubmit = async (data) => {
    data.postTime = new Date().toISOString();
    data.postedBy = user.displayName;
    // console.log(data);
    data.upvotes = 0;
    data.downvotes = 0;
    data.postVerificationScore = 0;

    const response = await axios.post(
      "http://localhost:3000/add-new-crime",
      data
    );
    console.log(response);
  };

  return (
    <div>
      <h1>Report Crime</h1>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  {...register("title")}
                  placeholder="title"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image</span>
                </label>
                <input
                  type="url"
                  {...register("image")}
                  placeholder="image"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input
                  type="text"
                  {...register("description")}
                  placeholder="description"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Division</span>
                </label>
                <select
                  {...register("division")}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select Division</option>
                  {Object.keys(districtsByDivision).map((div) => (
                    <option key={div} value={div}>
                      {div}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">District</span>
                </label>
                <select
                  {...register("district")}
                  className="select select-bordered w-full"
                  required
                  disabled={!division}
                >
                  <option value="">Select District</option>
                  {filteredDistricts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Crime time</span>
                </label>
                <input
                  type="datetime-local"
                  {...register("crimeTime")}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Report</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCrime;
