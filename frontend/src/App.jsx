import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, Copy, CheckCircle2, ArrowRight, Scissors, Loader2 } from 'lucide-react';

function App() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const path = window.location.pathname;
    if (path.length > 1 && path !== '/') {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      window.location.href = `${apiUrl}${path}`;
    }
  }, []);

  if (window.location.pathname.length > 1 && window.location.pathname !== '/') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white p-4">
        <Loader2 className="w-12 h-12 text-sky-500 animate-spin mb-4" />
        <h2 className="text-2xl font-semibold text-slate-200">Redirecting...</h2>
        <p className="text-slate-400 mt-2">Taking you to your destination</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    setLoading(true);
    setError('');
    setShortUrl('');
    setCopied(false);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      const response = await axios.post(`${apiUrl}/shorten`, { url });
      setShortUrl(response.data.shortUrl);
    } catch (err) {
      console.error(err);
      setError('Failed to shorten URL. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-slate-900">
      {/* Background decorative elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-sky-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />

      <div className="glass rounded-3xl p-8 sm:p-10 w-full max-w-xl z-10 shadow-2xl relative">
        <div className="flex justify-center mb-6">
          <div className="p-3 bg-sky-500/10 rounded-2xl border border-sky-500/20">
            <Scissors className="w-10 h-10 text-sky-400" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-3 text-gradient tracking-tight">
          SnapLink
        </h1>
        <p className="text-slate-400 text-center mb-8 text-lg font-medium">
          Transform your long, messy links into neat, shareable URLs in seconds.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-sky-400 transition-colors">
              <Link className="w-5 h-5" />
            </div>
            <input
              type="url"
              placeholder="https://your-very-long-url.com..."
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError('');
              }}
              className="w-full bg-slate-800/80 border border-slate-700/50 text-white rounded-xl pl-12 pr-4 py-4 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all placeholder:text-slate-500 text-lg shadow-inner"
              required
            />
          </div>

          {error && (
            <div className="text-rose-400 text-sm font-medium px-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block"></span>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sky-500/20 disabled:opacity-70 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center gap-2 text-lg">
                Shorten URL
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-8 pt-8 border-t border-slate-700/50 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="text-sm text-slate-400 font-medium mb-3 uppercase tracking-wider">Your short link is ready!</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-slate-800/80 border border-slate-700/50 rounded-xl p-4 flex items-center shadow-inner break-all">
                <a 
                  href={shortUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 font-medium transition-colors"
                >
                  {shortUrl}
                </a>
              </div>
              <button
                onClick={handleCopy}
                className={`flex items-center justify-center gap-2 font-semibold py-4 px-6 rounded-xl transition-all sm:w-auto w-full border ${
                  copied 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
