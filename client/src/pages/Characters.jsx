import { useEffect, useState } from 'react';
import { characters as charactersApi } from '../utils/api';

export default function Characters() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChar, setSelectedChar] = useState(null);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      const response = await charactersApi.getAll();
      setCharacters(response.data);
    } catch (error) {
      console.error('Failed to load characters:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLevelUp = async (id) => {
    try {
      const char = characters.find(c => c.id === id);
      const targetLevel = char.level + 1;
      await charactersApi.levelUp(id, targetLevel);
      loadCharacters();
      alert('Character leveled up!');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to level up');
    }
  };

  const handleAscend = async (id) => {
    try {
      await charactersApi.ascend(id);
      loadCharacters();
      alert('Character ascended!');
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to ascend');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading characters...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Characters</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {characters.map((char) => (
          <div
            key={char.id}
            className={`card rarity-${char.rarity} cursor-pointer hover:scale-105 transition-transform`}
            onClick={() => setSelectedChar(char)}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{char.character_name}</h3>
              <span className="text-xs px-2 py-1 bg-gray-700 rounded">
                {char.rarity}★
              </span>
            </div>

            <div className="text-sm text-gray-400 mb-3">
              {char.pathway_name} • Seq {char.sequence}
            </div>

            <div className="space-y-1 text-sm mb-3">
              <div className="flex justify-between">
                <span>Level</span>
                <span className="font-semibold">{char.level}</span>
              </div>
              <div className="flex justify-between">
                <span>Ascension</span>
                <span className="font-semibold">{char.ascension}</span>
              </div>
              <div className="flex justify-between">
                <span>Eidolon</span>
                <span className="font-semibold">E{char.eidolon}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <div className="text-gray-400">HP</div>
                <div className="font-semibold">{char.hp}</div>
              </div>
              <div>
                <div className="text-gray-400">ATK</div>
                <div className="font-semibold">{char.atk}</div>
              </div>
              <div>
                <div className="text-gray-400">DEF</div>
                <div className="font-semibold">{char.def}</div>
              </div>
              <div>
                <div className="text-gray-400">SPD</div>
                <div className="font-semibold">{char.spd}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedChar && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedChar(null)}
        >
          <div
            className={`card rarity-${selectedChar.rarity} max-w-2xl w-full`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedChar.character_name}</h2>
                <p className="text-gray-400">
                  {selectedChar.pathway_name} • Sequence {selectedChar.sequence}
                </p>
              </div>
              <button
                onClick={() => setSelectedChar(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold mb-2">Stats</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>HP:</span>
                    <span>{selectedChar.hp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ATK:</span>
                    <span>{selectedChar.atk}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DEF:</span>
                    <span>{selectedChar.def}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RES:</span>
                    <span>{selectedChar.res}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SPD:</span>
                    <span>{selectedChar.spd}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Progression</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Level:</span>
                    <span>{selectedChar.level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Ascension:</span>
                    <span>{selectedChar.ascension}/6</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Eidolon:</span>
                    <span>E{selectedChar.eidolon}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Acting:</span>
                    <span>{selectedChar.acting_progress}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleLevelUp(selectedChar.id)}
                className="button-primary flex-1"
              >
                Level Up
              </button>
              <button
                onClick={() => handleAscend(selectedChar.id)}
                className="button-secondary flex-1"
              >
                Ascend
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
