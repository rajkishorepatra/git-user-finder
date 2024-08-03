import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";
import moment from "moment";
import Chip from "@mui/material/Chip";

const UserSearch = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (inputValue) => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.github.com/search/users?q=${inputValue}`
        );
        const users = response.data.items.map((user) => ({
          value: user.login,
          label: (
            <div className="flex items-center">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="w-8 h-8 mr-2 rounded-full"
              />
              {user.login}
            </div>
          ),
        }));
        setOptions(users);
      } catch (error) {
        console.error("Error fetching user suggestions:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (inputValue.length > 2) getUser();
  };

  const handleUserSelect = async (selectedOption) => {
    setSelectedOption(selectedOption);
    setUsername(selectedOption.value);
  };

  const handleSearch = async () => {
    try {
      const userResponse = await axios.get(
        `https://api.github.com/users/${username}`
      );
      const reposResponse = await axios.get(
        `https://api.github.com/users/${username}/repos`
      );
      const repos = await axios.get(`${userResponse?.data?.repos_url}`)
      console.log(repos)
      console.log(userResponse);
      setUserData(userResponse.data);
      setRepos(reposResponse.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  console.log(userData?.avatar_url);
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="md:w-2/3 lg:w-2/3 w-[90%] mx-auto py-10 px-5 rounded-xl bg-white shadow-lg my-5">
          <Select
            value={selectedOption}
            onChange={handleUserSelect}
            onInputChange={handleInputChange}
            options={options}
            placeholder="Search for a GitHub user..."
            isLoading={isLoading}
          />
          <button
            onClick={handleSearch}
            className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
          {userData && (
            <div className="mt-6">
              <div className="border-t border-gray-200 pt-4">
                <p className="text-3xl font-bold">User Data</p>
                <div className="flex justify-center m-5 flex-wrap">
                  <img
                    src={userData.avatar_url}
                    alt={userData.login}
                    className="mr-2 rounded-full my-auto mx-5"
                    style={{ width: "10rem" }}
                  />
                  <div className="my-auto mx-5 text-left">
                    <p className="mx-2">
                      <span className="font-semibold">Username:</span>{" "}
                      {userData.login}
                    </p>
                    <p className="mx-2">
                      <span className="font-semibold">Name:</span>{" "}
                      {userData.name || "N/A"}
                    </p>
                    <p className="mx-2">
                      <span className="font-semibold">Bio:</span>{" "}
                      {userData.bio || "N/A"}
                    </p>
                    <p className="mx-2">
                      <span className="font-semibold">Location:</span>{" "}
                      {userData.location || "N/A"}
                    </p>
                    <div className="flex flex-wrap">
                      <p className="mx-2">
                        <span className="font-semibold">Followers:</span>{" "}
                        {userData.followers}
                      </p>
                      <p className="mx-2">
                        <span className="font-semibold">Following:</span>{" "}
                        {userData.following || "N/A"}
                      </p>
                    </div>
                    <p className="mx-2">
                      <span className="font-semibold">Public Repos:</span>{" "}
                      {userData.public_repos || "N/A"}
                    </p>
                    <p className="mx-2">
                      <span className="font-semibold">joined on:</span>{" "}
                      {moment.utc().format("DD/MM/YYYY") || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {repos.length > 0 && (
            <div className="mt-6">
              <div className="border-t border-gray-200 pt-4">
                <p className="text-lg font-semibold">Repositories</p>
                <ul className=" list-inside flex list-none gap-3 flex-wrap mt-5 justify-center">
                  {repos.map((repo) => (
                    <li key={repo.id}>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        <Chip value={repo.html_url} label={repo.name} />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div>Developed by <a href="https://www.github.com/rajkishorepatra" className="text-blue-500">Raj Kishore Patra</a></div>
      </div>
    </>
  );
};

export default UserSearch;
