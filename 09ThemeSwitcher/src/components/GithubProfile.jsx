import React, { useEffect, useState } from "react";

export default function GithubProfile() {
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);

    const username = "iankitraj"; // ✅ your GitHub username

    useEffect(() => {
        // fetch profile
        fetch(`https://api.github.com/users/${username}`)
            .then((res) => res.json())
            .then((data) => setUser(data));

        // fetch latest 12 repositories
        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=12`)
            .then((res) => res.json())
            .then((data) => setRepos(data));
    }, [username]);

    if (!user) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="w-full max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-6">
            {/* Profile Info */}
            <div className="flex flex-col items-center">
                <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                    src={user.avatar_url}
                    alt={user.login}
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {user.name || user.login}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {user.bio || "No bio available"}
                </span>
                <div className="mt-4 flex space-x-6 text-gray-700 dark:text-gray-300">
                    <span>Repos: {user.public_repos}</span>
                    <span>Followers: {user.followers}</span>
                    <span>Following: {user.following}</span>
                </div>
                <a
                    href={user.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                >
                    View Full Profile
                </a>
            </div>

            {/* Repo List */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Latest Repositories
                </h3>
                <ul className="grid gap-4 sm:grid-cols-2">
                    {repos.map((repo) => (
                        <li
                            key={repo.id}
                            className="p-3 border border-gray-200 rounded-lg dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 dark:text-blue-400 font-medium"
                            >
                                {repo.name}
                            </a>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {repo.description || "No description"}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
