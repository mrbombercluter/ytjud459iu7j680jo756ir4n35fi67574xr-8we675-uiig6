import { useState } from 'react';

function App() {
  const [greetCount, setGreetCount] = useState(0);
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);

  const handleHiBob = () => {
    if (isOnCooldown) return;
    
    const newCount = greetCount + 1;
    setGreetCount(newCount);
    setShowNotification(true);
    setIsOnCooldown(true);
    setTimeLeft(5);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
    
    const countdown = setInterval(() => {
      setTimeLeft((prev: number) => {
        if (prev <= 1) {
          clearInterval(countdown);
          setIsOnCooldown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative"
      style={{
        backgroundImage: 'url(/background.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        cursor: 'url(/cursor.png), auto'
      }}
    >
      {/* Notification Popup */}
      {showNotification && (
        <div className="fixed top-8 right-8 bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl border-2 border-green-400 z-50 animate-bounce">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <div>
              <p className="font-bold">You said Hi to Bob!</p>
              <p className="text-sm">You've greeted Bob {greetCount} time{greetCount !== 1 ? 's' : ''}</p>
              <p className="text-xs opacity-90">You can greet him again in 5 seconds</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Tyrone Box */}
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-12 mb-8 border border-white/20">
        <div className="flex flex-col items-center space-y-6">
          <img 
            src="/pfp.png" 
            alt="Tyrone's Profile Picture" 
            className="w-32 h-32 rounded-full shadow-lg border-4 border-white"
          />
          <h1 className="text-6xl font-bold text-gray-800 tracking-wide">
            Tyrone
          </h1>
        </div>
      </div>

      {/* Bob Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
        <div className="flex items-center space-x-4">
          <img 
            src="/bob.png" 
            alt="Bob" 
            className="w-16 h-16 rounded-lg shadow-md"
          />
          <div className="flex items-center space-x-3">
            <p className="text-gray-700 font-medium">
              This is BOB, Say hi to bob
            </p>
            <button 
              onClick={handleHiBob}
              disabled={isOnCooldown}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md ${
                isOnCooldown 
                  ? 'bg-gray-400 cursor-not-allowed text-gray-200' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg'
              }`}
              style={{ cursor: 'url(/cursor.png), pointer' }}
            >
              {isOnCooldown ? `Wait ${timeLeft}s` : 'Hi!'}
            </button>
          </div>
        </div>
      </div>

      {/* Greeting Counter */}
      {greetCount > 0 && (
        <div className="fixed bottom-8 left-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 border border-white/20">
          <p className="text-gray-700 font-medium">
            Total greetings to Bob: <span className="font-bold text-blue-600">{greetCount}</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;