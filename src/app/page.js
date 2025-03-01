"use client";

import Image from "next/image";
import { useState } from "react";
import { devLogs } from "@/app/devlogs";

export default function Home() {
  const [showOlderVersions, setShowOlderVersions] = useState(false);
  const [showAllDevLogs, setShowAllDevLogs] = useState(false);

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Split logs into visible and hidden groups
  const visibleLogs = showAllDevLogs ? devLogs : devLogs.slice(0, 4);
  const hasHiddenLogs = devLogs.length > 4;

  return (
    <div
      className="flex flex-row items-start justify-start min-h-screen bg-gradient-to-r from-purple-200 via-white to-gray-200 p-4"
      style={{
        background: "linear-gradient(70deg, #E0BBE4, #FFFFFF, #D3D3D3)",
        fontFamily: "Jersey",
        fontSize: "30px",
        fontWeight: "600",
      }}
    >
      {/* Game Info and Downloads */}
      <div className="flex flex-col items-start mr-4 overflow-x-hidden">
        <div className="flex items-center mb-4 ml-5 mt-5">
          <Image
            src="/favicon.ico"
            alt="Game Image"
            width={100}
            height={100}
            className="mr-4"
          />
          <h1 className="text-4xl text-gray-900">3D World's Hardest Game</h1>
        </div>

        <div className="flex flex-col space-y-4 ml-5">
          <h2 className="text-gray-800 mt-5">Download it!</h2>
          <h2 className="text-gray-800" style={{ fontSize: "25px" }}>
            Latest Stable Version:
          </h2>

          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 bg-green-500 text-white rounded">
              Download
            </button>
            <p className="text-2xl text-gray-700">MacOS</p>
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 bg-green-500 text-white rounded">
              Download
            </button>
            <p className="text-2xl text-gray-700">Windows</p>
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 bg-green-500 text-white rounded">
              Download
            </button>
            <p className="text-2xl text-gray-700">Linux</p>
          </div>

          <h2 className="text-gray-800" style={{ fontSize: "25px" }}>
            Prerelease:
          </h2>

          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 bg-blue-500 text-white rounded">
              Download
            </button>
            <p className="text-2xl text-gray-700">MacOS</p>
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 bg-blue-500 text-white rounded">
              Download
            </button>
            <p className="text-2xl text-gray-700">Windows</p>
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-2 py-1 bg-blue-500 text-white rounded">
              Download
            </button>
            <p className="text-2xl text-gray-700">Linux</p>
          </div>

          {/* Toggle button for older versions */}
          <button
            onClick={() => setShowOlderVersions(!showOlderVersions)}
            className="text-gray-800 mt-2 hover:text-gray-600 transition-colors -ml-1"
          >
            {showOlderVersions ? "▼ Hide older versions" : "▶ Show older versions"}
          </button>

          {/* Older versions */}
          <div
            className={`transform transition-transform duration-300 ease-in-out ${
              showOlderVersions ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <h2 className="text-gray-800" style={{ fontSize: "25px" }}>
              Older Versions:
            </h2>

            <div className="flex items-center space-x-2 mt-2">
              <button className="px-2 py-1 bg-gray-400 text-white rounded">
                Download
              </button>
              <p className="text-2xl text-gray-700">MacOS</p>
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <button className="px-2 py-1 bg-gray-400 text-white rounded">
                Download
              </button>
              <p className="text-2xl text-gray-700">Windows</p>
            </div>

            <div className="flex items-center space-x-2 mt-2">
              <button className="px-2 py-1 bg-gray-400 text-white rounded">
                Download
              </button>
              <p className="text-2xl text-gray-700">Linux</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col items-start mt-33 text-gray-800 -ml-30" style={{ width: "30ch" }}>
        <h2>About this game:</h2>
        <p className="text-gray-700 text-md" style={{ fontSize: "20px", wordWrap: "break-word" }}>
          This game was made for{" "}
          <a
            href="https://juice.hackclub.com/"
            className="text-purple-500 underline text-sm"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "20px" }}
          >
            Hack Club Juice
          </a>
          !<br></br>
          In this game, you control a player and you have to reach the end of the level. But be careful, there are obstacles that you have to avoid! Some include moving enemies, wind, moving platforms, ice, mud, and more!<br></br>
          This game was made using Unity and C#. No AI was used in the making of this game, and all assets, scripts, and levels were made by me.<br></br>
          This game is inspired by the 2D Flash game "The World's Hardest Game" by Stephen Critoph. No work was copied from that game.<br></br>
          The game is open source, and you can find the source code on{" "}
          <a
            href="https://github.com/EwoudVV/3d-Worlds-Hardest-Game"
            className="text-purple-500 underline text-sm"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: "20px" }}
          >
            GitHub
          </a>
          !<br></br>
          This game is still in development and is super WIP, so there may be bugs, even in the latest builds. If you find any, please report them to me in the comments section!
        </p>
      </div>

      {/* Development Logs */}
      <div className="flex flex-row ml-20">
        <div className="flex flex-col items-start mt-33 text-gray-800 relative" style={{ width: "35ch" }}>
          <h2 className="mb-4 whitespace-nowrap">Development Logs</h2>
          <div className="space-y-6 w-full">

            {visibleLogs.map((log, index) => (
              <div
                key={index}
                className="border-l-4 border-purple-300 pl-4 pb-4"
                style={{
                  borderBottom: index !== visibleLogs.length - 1 ? "1px solid #e5e7eb" : "none",
                  paddingBottom: "1.5rem",
                }}
              >
                <h3 className="text-xl font-semibold mb-1">{log.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {formatDate(log.date)}
                </p>
                <p className="text-gray-700 text-lg leading-snug">{log.description}</p>
              </div>
            ))}

            <div className={`overflow-hidden transition-all duration-300 ${showAllDevLogs ? 'max-h-[1000px]' : 'max-h-0'}`}>
              {hasHiddenLogs && devLogs.slice(4).map((log, index) => (
                <div
                  key={index + 4}
                  className="border-l-4 border-purple-300 pl-4 pb-4"
                  style={{
                    paddingBottom: "1.5rem",
                  }}
                >
                  <h3 className="text-xl font-semibold mb-1">{log.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {formatDate(log.date)}
                  </p>
                  <p className="text-gray-700 text-lg leading-snug">{log.description}</p>
                </div>
              ))}
            </div>

            {hasHiddenLogs && (
              <button
                onClick={() => setShowAllDevLogs(!showAllDevLogs)}
                className="text-gray-800 hover:text-gray-600 transition-colors -mt-40 -ml-1"
              >
                {showAllDevLogs ? "▲ Show less" : "▼ Show more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}