import { useEffect } from 'react';

export default function Login({ bgImage }) {
  useEffect(() => {
    // Console Easter Egg
    const styles = {
      title: 'color: #3b82f6; font-size: 20px; font-weight: bold;',
      message: 'color: #6b7280; font-size: 14px;',
      success: 'color: #10b981; font-size: 14px; font-weight: bold;',
      link: 'color: #8b5cf6; font-size: 13px;'
    };

    console.log('%c🔒 VinFast Dashboard - Temporarily Offline', styles.title);
    console.log('%cReason: X-HASH authentication (HMAC-SHA256)', styles.message);
    console.log('%cStatus: Researching reverse engineering solutions...', styles.message);
    console.log('');
    console.log('%c🚀 We\'ll be back soon if we crack the secret key!', styles.success);
    console.log('%cStay tuned for updates. The adventure isn\'t over yet! 😉', styles.message);
    console.log('');
    console.log('%c📚 Check out our API analysis:', styles.link);
    console.log('%c   → https://github.com/VF9-Club/VFDashboard/tree/main/docs/api', styles.link);
    console.log('');
    console.log('%c💡 Know how to extract the secret? We\'d love your help!', 'color: #f59e0b; font-size: 13px;');
  }, []);

  return (
    <div
      className="flex h-full md:min-h-screen w-full flex-col items-center justify-center bg-cover bg-center relative px-4"
      style={{ backgroundImage: `url('${bgImage || "/vf9-interior.png"}')` }}
    >
      {/* Overlay for Blur and Darkening */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-lg space-y-4">
        {/* Sunset Notice Card */}
        <div className="relative rounded-3xl bg-white p-6 md:p-10 shadow-xl border border-gray-100 backdrop-blur-sm">

          {/* VinFast Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/vinfast-logo.png"
              alt="VinFast"
              className="h-8 md:h-12 object-contain"
            />
          </div>

          {/* Emoji Header */}
          <div className="text-center mb-4">
            <div className="text-5xl md:text-7xl mb-2 animate-bounce">🔒</div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-1">
              Well, That Was Fun!
            </h1>
            <p className="text-sm md:text-lg text-gray-500 font-medium">
              (Legend Archived)
            </p>
          </div>

          {/* Main Message */}
          <div className="space-y-4 text-center">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 md:p-6 border border-blue-100">
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                VinFast has <span className="font-bold text-blue-600">leveled up their security</span>
                {" "}with new X-HASH authentication.
                Our little adventure has come to an end (for now). 🎉
              </p>
            </div>

            {/* Compact Stats */}
            <div className="grid grid-cols-3 gap-2 py-2 border-y border-gray-50">
              <div className="text-center">
                <div className="text-xl md:text-3xl font-black text-blue-600">39</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">APIs Found</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-3xl font-black text-purple-600">124</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Logs Analysed</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-3xl font-black text-pink-600">0%</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">Static Hash</div>
              </div>
            </div>

            {/* Farewell Message */}
            <div className="p-2">
              <p className="text-gray-800 font-bold text-base mb-1">
                🎩 Thanks for the ride!
              </p>
              <p className="text-gray-500 text-xs leading-relaxed">
                Stay tuned. We'll be back if we crack the secret key.
                Until then, keep those Vinfast EVs charged! ⚡
              </p>
            </div>
          </div>
        </div>

        {/* Footer: Github - Text - VF9 Club */}
        <div className="relative flex items-center justify-between px-4 py-3 bg-white/90 rounded-2xl border border-gray-100 shadow-sm">
          {/* Left: GitHub */}
          <a
            href="https://github.com/VF9-Club/VFDashboard"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-gray-900 transition-colors duration-300"
            title="View Source on GitHub"
          >
            <svg
              className="h-8 w-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          {/* Center: Text */}
          <p className="text-gray-500 text-xs font-bold uppercase tracking-wider text-center">
            Made with <span className="text-red-500 text-sm">❤️</span> in
            Vietnam
          </p>

          {/* Right: VF9 Club */}
          <a
            href="https://www.facebook.com/groups/706124277686588/"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <img
              src="/vf9-club-logo-new.png"
              alt="VF9 Club"
              className="h-8 object-contain opacity-100 hover:scale-110 transition-all duration-300"
            />
          </a>
        </div>

        {/* Easter Egg: Secret Message */}
        <div className="text-center">
          <p className="text-white/40 text-xs font-mono">
            P.S. If you're reading this in the browser console...
            we see you, fellow hacker! 😎
          </p>
        </div>
      </div>
    </div>
  );
}
