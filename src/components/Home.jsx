import React from 'react'
import Navbar from './Navbar'
import MapComponent from './Mapcomponent'
import Footer from './footer'
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row items-center gap-6 p-6">
        {/* Text Section */}
        <div className="text-3xl font-bold text-gray-800 md:w-1/3">
          Find & Recover with ease
        </div>

        {/* Map Section */}
        <div className="md:w-[600px] md:h-[400px] w-full h-[300px] shadow-lg border rounded-lg overflow-hidden">
          <MapComponent />
        </div>
      </div>

      <Footer />

    </>
  )
}

export default Home