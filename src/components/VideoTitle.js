

const VideoTitle = ({title, overview}) => {
  return (
    <div className="w-screen aspect-video sm:pt-[20%] md:pt-[12%] pt-[15%] lg:pt-[13%] px-12 absolute text-white bg-gradient-to-r from-black">
        <h1 className="text-2xl sm:text-3xl font-bold lg:text-5xl mb-6 md:text-6xl md:mb-0">{title}</h1>
        <p className="hidden md:inline-block py-6 text-lg w-1/4 sm:text-sm lg:text-lg lg:w-1/2">{overview}</p>
        <div className="flex mt-4">
            <button className="bg-white text-black py-1 md:py-4 px-8 text-xl rounded-md mr-2 hover:bg-opacity-80">
             Play
            </button>
            <button className="hidden md:inline-block bg-gray-500 text-black p-4 px-12 text-xl bg-opacity-50 rounded-md">More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle