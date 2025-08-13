import "./App.css";
import TypingBox from "./components/TypingBox";

function App() {
  return (
    <>
      <div className="h-screen bg-gray-900 text-white flex justify-center items-center p-4">
        <div className="w-full max-w-2xl text-center">
          <h1 className="text-3xl font-bold mb-4 tracking-wider">
            ⚡Typing Speed Test
          </h1>
          <TypingBox />
        </div>
      </div>
    </>
  );
}

export default App;
