import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-start justify-start min-h-screen bg-gradient-to-r from-purple-200 via-white to-gray-200 p-4" style={{ background: 'linear-gradient(70deg, #E0BBE4, #FFFFFF, #D3D3D3)', fontFamily: 'Jersey', fontSize: '30px', fontWeight: '600' }}>

      <div className="flex items-center mb-4">
        <Image src="/favicon.ico" alt="Game Image" width={100} height={100} className="mr-4" />
        <h1 className="text-4xl text-gray-900">3D World's Hardest Game</h1>
      </div>

      <div className="flex items-center space-x-2 text-gray-800">
        <h1>About this game:</h1>
      </div>

      <div className="flex flex-col space-y-4">

        <div className="flex items-center space-x-2">
          <button className="px-2 py-1 bg-blue-500 text-white rounded">Download</button>
          <p className="text-2xl text-gray-700">MacOS (Intel and Apple Silicon)</p>
        </div>

        <div className="flex items-center space-x-2">
          <button className="px-2 py-1 bg-green-500 text-white rounded">Download</button>
          <p className="text-2xl text-gray-700">Windows</p>
        </div>

        <div className="flex items-center space-x-2">
          <button className="px-2 py-1 bg-red-500 text-white rounded">Download</button>
          <p className="text-2xl text-gray-700">Linux</p>
        </div>

      </div>
    </div>
  );
}
