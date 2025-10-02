import { useState } from 'react';
import { gacha as gachaApi } from '../utils/api';

export default function Gacha() {
  const [bannerType, setBannerType] = useState('standard');
  const [results, setResults] = useState(null);
  const [pulling, setPulling] = useState(false);

  const handlePull = async (count) => {
    if (pulling) return;
    
    setPulling(true);
    setResults(null);

    try {
      const response = await gachaApi.pull(bannerType, count);
      setResults(response.data);
    } catch (error) {
      alert(error.response?.data?.error || 'Pull failed');
    } finally {
      setPulling(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Gacha</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div
          className={`card cursor-pointer transition ${
            bannerType === 'standard'
              ? 'border-primary bg-primary/10'
              : 'hover:border-gray-500'
          }`}
          onClick={() => setBannerType('standard')}
        >
          <h2 className="text-xl font-bold mb-2">Standard Banner</h2>
          <p className="text-gray-400 text-sm mb-4">
            Permanent banner with all standard characters
          </p>
          <div className="text-xs text-gray-500">
            <div>5★ Rate: 0.6%</div>
            <div>4★ Rate: 5.1%</div>
            <div>3★ Rate: 94.3%</div>
          </div>
        </div>

        <div
          className={`card cursor-pointer transition ${
            bannerType === 'limited'
              ? 'border-secondary bg-secondary/10'
              : 'hover:border-gray-500'
          }`}
          onClick={() => setBannerType('limited')}
        >
          <h2 className="text-xl font-bold mb-2">Limited Banner</h2>
          <p className="text-gray-400 text-sm mb-4">
            Featured: Amon (Error Pathway)
          </p>
          <div className="text-xs text-gray-500">
            <div>50/50 system for 5★</div>
            <div>Pity at 90 pulls</div>
            <div>Soft pity starts at 74</div>
          </div>
        </div>
      </div>

      <div className="card mb-8">
        <h3 className="text-lg font-semibold mb-4">Pull Options</h3>
        <div className="flex gap-4">
          <button
            onClick={() => handlePull(1)}
            disabled={pulling}
            className="button-primary flex-1 disabled:opacity-50"
          >
            {pulling ? 'Pulling...' : 'Single Pull (160 Tokens)'}
          </button>
          <button
            onClick={() => handlePull(10)}
            disabled={pulling}
            className="button-secondary flex-1 disabled:opacity-50"
          >
            {pulling ? 'Pulling...' : '10-Pull (1600 Tokens)'}
          </button>
        </div>
      </div>

      {results && (
        <div className="card">
          <h3 className="text-xl font-bold mb-4">Pull Results</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
            {results.results.map((result, index) => (
              <div
                key={index}
                className={`card rarity-${result.rarity} text-center`}
              >
                <div className="text-2xl mb-2">
                  {result.rarity === 5 ? '⭐' : result.rarity === 4 ? '💜' : '⚪'}
                </div>
                <div className="font-semibold mb-1">{result.character}</div>
                <div className="text-xs text-gray-400">{result.rarity}★</div>
                {result.type === 'duplicate' && (
                  <div className="text-xs text-yellow-500 mt-1">
                    E{result.eidolon}
                  </div>
                )}
                {result.type === 'new' && (
                  <div className="text-xs text-green-500 mt-1">NEW!</div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-gray-700 pt-4">
            <div className="flex justify-between text-sm">
              <span>Remaining Pity:</span>
              <span className="font-semibold">{results.remainingPity}/90</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Next 5★ Guaranteed:</span>
              <span className="font-semibold">
                {results.isGuaranteed ? 'Yes' : 'No (50/50)'}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cost:</span>
              <span className="font-semibold">{results.cost} Tokens</span>
            </div>
          </div>
        </div>
      )}

      <div className="card mt-8 bg-blue-900/20 border-blue-500">
        <h3 className="text-lg font-semibold mb-2">ℹ️ Pity System</h3>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Soft pity starts at pull 74 (increased rates)</li>
          <li>• Hard pity at pull 90 (guaranteed 5★)</li>
          <li>• Limited banner: 50/50 for featured character</li>
          <li>• If you lose 50/50, next 5★ is guaranteed featured</li>
          <li>• Pity carries over between same banner type</li>
        </ul>
      </div>
    </div>
  );
}
