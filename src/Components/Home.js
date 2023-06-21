import ReactPlayer from "react-player/lazy";
const Home = () => {
  return (
    <>
      <div className='container-fluid mt-2'>

        <h4 style={{ justifyContent: "center", display: "flex" }}>
          Welcome To Home Page
        </h4>
        <div style={{ justifyContent: "center", display: "flex" }}>
          <ReactPlayer
            width="1000px"
            height="550px"
            controls
            url="https://youtu.be/gXRWiQanMRI"
            onReady={() => console.log("Ready")}
            onStart={() => console.log("Started")}
            onPause={() => console.log("Paused")}
            onEnded={() => console.log("Ended")}
            onError={() => console.log("Error")}
          />
        </div>
      </div>
    </>
  )
}

export default Home