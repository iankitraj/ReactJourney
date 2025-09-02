import React from "react";
import { useLoaderData } from "react-router-dom";

function Github() {
    const { profile, repos } = useLoaderData();

    return (
        <div className="bg-gray-900 min-h-screen text-white flex flex-col items-center py-10 px-4">
            {/* Profile Section */}
            <div className="max-w-5xl w-full bg-gray-800 rounded-xl shadow-lg p-8">
                {/* Avatar + Name */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                    <img
                        src={profile.avatar_url}
                        alt="Git Avatar"
                        className="w-40 h-40 rounded-full border-4 border-yellow-400"
                    />
                    <div>
                        <h1 className="text-3xl font-bold">{profile.name}</h1>
                        <p className="text-gray-400">@{profile.login}</p>
                        <p className="mt-3">{profile.bio || "No bio available."}</p>
                        <div className="flex gap-6 mt-4 text-gray-300">
                            <span>👥 Followers: {profile.followers}</span>
                            <span>⭐ Repos: {profile.public_repos}</span>
                            <span>📍 {profile.location || "Unknown"}</span>
                        </div>
                    </div>
                </div>

                {/* Highlighted Projects */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">
                        📌 Highlighted Projects
                    </h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                        <li>
                            <a
                                href="https://github.com/iankitraj/ChatApp"
                                target="_blank"
                                className="text-yellow-400 hover:underline"
                            >
                                💬 ChatApp
                            </a>{" "}
                            – Real-time messaging app
                        </li>
                        <li>
                            <a
                                href="https://github.com/iankitraj/Plastic-Waste-Management"
                                target="_blank"
                                className="text-yellow-400 hover:underline"
                            >
                                🌍 Plastic Waste Management
                            </a>{" "}
                            – Eco-friendly waste tracking system
                        </li>
                        <li>
                            <a
                                href="https://github.com/iankitraj/Simple-Animated-Calculator"
                                target="_blank"
                                className="text-yellow-400 hover:underline"
                            >
                                🧮 Simple Animated Calculator
                            </a>{" "}
                            – Fun animated calculator project
                        </li>
                    </ul>
                </div>

                {/* Actively Pushed Repos */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold border-b border-gray-700 pb-2 mb-4">
                        🔥 Actively Pushed Projects
                    </h2>
                    <ul className="space-y-3">
                        {repos.map((repo) => (
                            <li
                                key={repo.id}
                                className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition"
                            >
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    className="text-yellow-400 font-semibold hover:underline"
                                >
                                    {repo.name}
                                </a>
                                <p className="text-gray-300 text-sm mt-1">
                                    {repo.description || "No description provided"}
                                </p>
                                <span className="text-gray-400 text-xs">
                                    ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
                                </span>
                                <br />
                                <span className="text-gray-500 text-xs">
                                    ⏳ Last Push: {new Date(repo.pushed_at).toLocaleString()}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Github;

export const githubInfoLoader = async () => {
    const profileRes = await fetch("https://api.github.com/users/iankitraj");
    const reposRes = await fetch(
        "https://api.github.com/users/iankitraj/repos?per_page=100"
    );

    const profile = await profileRes.json();
    let repos = await reposRes.json();

    // sort repos by latest push
    repos = repos
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, 5); // only top 5 latest pushed repos

    return { profile, repos };
};
