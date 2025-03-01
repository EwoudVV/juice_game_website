"use client";

import Image from "next/image";
import { useState } from "react";
import { devLogs } from "@/app/devlogs";
import { builds } from "@/data/builds";

const parseVersion = (v) => v.split('.').map(Number);
const compareVersions = (a, b) => {
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const partA = a[i] || 0;
    const partB = b[i] || 0;
    if (partA > partB) return 1;
    if (partA < partB) return -1;
  }
  return 0;
};

export default function Home() {
  const [showOlderVersions, setShowOlderVersions] = useState(false);
  const [showAllDevLogs, setShowAllDevLogs] = useState(false);

  const processedBuilds = builds.map(file => {
    const match = file.match(/(mac|win|linux)-(its|dev)-(\d+\.\d+(?:\.\d+)?)/i);
    return {
      platform: match[1],
      type: match[2] === 'its' ? 'LTS' : 'Dev',
      version: match[3],
      versionParts: parseVersion(match[3]),
      file: file.includes('.') ? file : `${file}.app`
    };
  });

  const findCommonVersion = (type) => {
    const versionsMap = processedBuilds
      .filter(b => b.type === type)
      .reduce((acc, b) => {
        if (!acc[b.version]) acc[b.version] = new Set();
        acc[b.version].add(b.platform);
        return acc;
      }, {});

    const versions = Object.entries(versionsMap)
      .filter(([_, platforms]) => platforms.size === 3)
      .sort(([a], [b]) => compareVersions(parseVersion(b), parseVersion(a)));

    return versions[0]?.[0];
  };

  const stableVersion = findCommonVersion('LTS');
  const prereleaseVersion = findCommonVersion('Dev');

  const stableBuilds = processedBuilds.filter(b => 
    b.type === 'LTS' && b.version === stableVersion
  );
  const prereleaseBuilds = processedBuilds.filter(b => 
    b.type === 'Dev' && b.version === prereleaseVersion
  );

  const olderBuilds = processedBuilds
    .filter(b => !stableBuilds.includes(b) && !prereleaseBuilds.includes(b))
    .sort((a, b) => compareVersions(b.versionParts, a.versionParts));

  const handleDownload = (filename) => {
    const link = document.createElement('a');
    link.href = `/builds/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-row items-start justify-start min-h-screen bg-gradient-to-r from-purple-200 via-white to-gray-200 p-4"
      style={{
        background: "linear-gradient(70deg, #E0BBE4, #FFFFFF, #D3D3D3)",
        fontFamily: "Jersey",
        fontSize: "30px",
        fontWeight: "600",
      }}>
      
      {/* Downloads Section */}
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

          {/* Stable Versions */}
          {stableBuilds.length > 0 && (
            <>
              <h2 className="text-gray-800" style={{ fontSize: "25px" }}>Latest Stable:</h2>
              {stableBuilds.map(b => (
                <div key={`stable-${b.platform}`} className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleDownload(b.file)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg text-xl hover:bg-green-600 transition-colors">
                    Download
                  </button>
                  <div className="flex items-center space-x-2">
                    <p className="text-xl text-gray-700">
                      {b.platform.charAt(0).toUpperCase() + b.platform.slice(1)}
                    </p>
                    <p className="text-xl text-gray-500">({b.version})</p>
                    <p className="text-xl text-gray-400">{b.type}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Prerelease Versions */}
          {prereleaseBuilds.length > 0 && (
            <>
              <h2 className="text-gray-800 mt-4" style={{ fontSize: "25px" }}>Prerelease:</h2>
              {prereleaseBuilds.map(b => (
                <div key={`prerelease-${b.platform}`} className="flex items-center space-x-4">
                  <button 
                    onClick={() => handleDownload(b.file)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg text-xl hover:bg-blue-600 transition-colors">
                    Download
                  </button>
                  <div className="flex items-center space-x-2">
                    <p className="text-xl text-gray-700">
                      {b.platform.charAt(0).toUpperCase() + b.platform.slice(1)}
                    </p>
                    <p className="text-xl text-gray-500">({b.version})</p>
                    <p className="text-xl text-gray-400">{b.type}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Older Versions */}
          <button
            onClick={() => setShowOlderVersions(!showOlderVersions)}
            className="text-gray-800 mt-2 -ml-25 hover:text-gray-600 transition-colors text-xl">
            {showOlderVersions ? "▼ Hide older versions" : "▶ Show older versions"}
          </button>

          <div className={`w-full transform transition-transform duration-300 ease-in-out ${
              showOlderVersions ? "translate-x-0" : "-translate-x-full"}`}
              style={{ overflow: 'hidden' }}>
            <h2 className="text-gray-800 mt-4" style={{ fontSize: "25px" }}>Older Versions:</h2>
            {olderBuilds.map(b => (
              <div key={`${b.platform}-${b.version}`} className="flex items-center space-x-4 mt-2">
                <button 
                  onClick={() => handleDownload(b.file)}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg text-xl hover:bg-purple-600 transition-colors">
                  Download
                </button>
                <div className="flex items-center space-x-2">
                  <p className="text-xl text-gray-700">
                    {b.platform.charAt(0).toUpperCase() + b.platform.slice(1)}
                  </p>
                  <p className="text-xl text-gray-500">({b.version})</p>
                  <p className="text-xl text-gray-400">{b.type}</p>
                </div>
              </div>
            ))}
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
          !
        </p>
      </div>

      {/* Dev Logs Section */}
      <div className="flex flex-row ml-20">
        <div className="flex flex-col items-start mt-33 text-gray-800" style={{ width: "35ch" }}>
          <h2 className="mb-4 whitespace-nowrap">Development Logs</h2>
          <div className="space-y-6 w-full">
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
              showAllDevLogs ? "max-h-[2000px]" : "max-h-[800px]"}`}>
              {(showAllDevLogs ? devLogs : devLogs.slice(0, 4)).map((log, index) => (
                <div
                  key={index}
                  className="border-l-4 border-purple-300 pl-4 pb-4 transition-opacity duration-300"
                  style={{
                    borderBottom: index !== devLogs.length - 1 ? "1px solid #e5e7eb" : "none",
                    paddingBottom: "1.5rem",
                  }}
                >
                  <h3 className="text-xl font-semibold mb-1">{log.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {new Date(log.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </p>
                  <p className="text-gray-700 text-lg leading-snug">{log.description}</p>
                </div>
              ))}
            </div>
            
            {devLogs.length > 4 && (
              <button
                onClick={() => setShowAllDevLogs(!showAllDevLogs)}
                className="text-gray-800 hover:text-gray-600 transition-colors mt-2 text-xl">
                {showAllDevLogs ? "▲ Show less" : "▼ Show more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}