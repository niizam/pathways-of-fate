import { useState, useEffect } from 'react';
import { characters as charactersApi, battle as battleApi } from '../utils/api';

export default function Battle() {
  const [characters, setCharacters] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [battleState, setBattleState] = useState(null);
  const [stageId, setStageId] = useState(1);

  useEffect(() => {
    loadCharacters();
  }, []);

  const loadCharacters = async () => {
    try {
      const response = await charactersApi.getAll();
      setCharacters(response.data);
    } catch (error) {
      console.error('Failed to load characters:', error);
    }
  };

  const toggleCharacter = (char) => {
    if (selectedTeam.find(c => c.id === char.id)) {
      setSelectedTeam(selectedTeam.filter(c => c.id !== char.id));
    } else if (selectedTeam.length < 4) {
      setSelectedTeam([...selectedTeam, char]);
    }
  };

  const startBattle = async () => {
    if (selectedTeam.length !== 4) {
      alert('Please select exactly 4 characters');
      return;
    }

    try {
      const response = await battleApi.start(stageId, selectedTeam.map(c => c.id));
      setBattleState(response.data);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to start battle');
    }
  };

  const performAction = async (characterId, actionType, targetId) => {
    if (!battleState) return;

    try {
      const response = await battleApi.action(battleState.battleId, {
        characterId,
        actionType,
        targetId,
      });
      
      setBattleState(response.data.battleState);

      if (response.data.battleState.status !== 'active') {
        setTimeout(() => {
          alert(
            response.data.battleState.status === 'victory'
              ? 'Victory! Rewards claimed.'
              : 'Defeat. Try again!'
          );
          setBattleState(null);
        }, 1000);
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Action failed');
    }
  };

  if (battleState) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Battle - Turn {battleState.turn}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="card">
            <h2 className="text-xl font-bold mb-4 text-green-500">Your Team</h2>
            <div className="space-y-2">
              {battleState.team.map((char) => (
                <div key={char.id} className="bg-gray-800 p-3 rounded">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{char.character_name}</span>
                    <span className="text-sm text-gray-400">
                      Energy: {char.energy}/4
                    </span>
                  </div>
                  <div className="stat-bar mb-1">
                    <div
                      className="stat-bar-fill hp"
                      style={{ width: `${(char.currentHp / char.hp) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400">
                    HP: {char.currentHp}/{char.hp}
                  </div>
                  <div className="flex gap-2 mt-2">
                    {char.currentHp > 0 && battleState.enemies.length > 0 && (
                      <>
                        <button
                          onClick={() =>
                            performAction(char.id, 'basic_attack', battleState.enemies[0].id)
                          }
                          className="text-xs button-primary py-1 px-2"
                        >
                          Basic
                        </button>
                        {char.energy >= 2 && (
                          <button
                            onClick={() =>
                              performAction(char.id, 'skill', battleState.enemies[0].id)
                            }
                            className="text-xs button-secondary py-1 px-2"
                          >
                            Skill
                          </button>
                        )}
                        {char.energy >= 4 && (
                          <button
                            onClick={() =>
                              performAction(char.id, 'ultimate', battleState.enemies[0].id)
                            }
                            className="text-xs bg-yellow-600 hover:bg-yellow-500 text-white py-1 px-2 rounded"
                          >
                            Ultimate
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4 text-red-500">Enemies</h2>
            <div className="space-y-2">
              {battleState.enemies.map((enemy) => (
                <div 
                  key={enemy.id} 
                  className={`p-3 rounded ${enemy.isBoss ? 'bg-red-900/30 border-2 border-red-500' : 'bg-gray-800'}`}
                >
                  <div className="flex justify-between mb-2">
                    <div>
                      <span className={`font-semibold ${enemy.isBoss ? 'text-red-400' : ''}`}>
                        {enemy.name}
                      </span>
                      {enemy.isBoss && <span className="ml-2 text-xs bg-red-600 px-2 py-1 rounded">BOSS</span>}
                      {enemy.type && <span className="ml-2 text-xs text-gray-500">({enemy.type})</span>}
                    </div>
                    <span className="text-sm text-gray-400">
                      Lv {enemy.level}
                    </span>
                  </div>
                  <div className="stat-bar mb-1">
                    <div
                      className="stat-bar-fill hp"
                      style={{ width: `${(enemy.currentHp / enemy.hp) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-400">
                    HP: {enemy.currentHp}/{enemy.hp}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => setBattleState(null)}
            className="button-secondary"
          >
            Retreat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Battle</h1>

      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Select Stage</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Array.from({ length: 20 }, (_, i) => i + 1).map((id) => {
              const chapter = Math.ceil(id / 5);
              const stageInChapter = ((id - 1) % 5) + 1;
              const isBoss = stageInChapter === 5;
              
              return (
                <button
                  key={id}
                  onClick={() => setStageId(id)}
                  className={`py-3 px-4 rounded transition ${
                    stageId === id
                      ? 'bg-primary text-white'
                      : isBoss
                      ? 'bg-red-900/30 border border-red-500 hover:bg-red-900/50'
                      : 'bg-gray-800 border border-gray-700 hover:bg-gray-700'
                  }`}
                >
                  <div className="font-bold">Chapter {chapter}-{stageInChapter}</div>
                  {isBoss && <div className="text-xs text-red-400">BOSS</div>}
                </button>
              );
            })}
          </div>
          <div className="text-sm text-gray-400">
            Selected: Chapter {Math.ceil(stageId / 5)}-{((stageId - 1) % 5) + 1}
            {((stageId - 1) % 5) + 1 === 5 && <span className="text-red-400 ml-2">(Boss Stage)</span>}
          </div>
        </div>
      </div>

      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">
          Select Team ({selectedTeam.length}/4)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {characters.map((char) => {
            const isSelected = selectedTeam.find(c => c.id === char.id);
            return (
              <div
                key={char.id}
                className={`card cursor-pointer ${
                  isSelected ? 'border-primary bg-primary/10' : 'hover:border-gray-500'
                }`}
                onClick={() => toggleCharacter(char)}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">{char.character_name}</span>
                  <span className="text-xs px-2 py-1 bg-gray-700 rounded">
                    {char.rarity}★
                  </span>
                </div>
                <div className="text-sm text-gray-400">
                  Lv {char.level} • {char.pathway_name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={startBattle}
          disabled={selectedTeam.length !== 4}
          className="button-primary disabled:opacity-50"
        >
          Start Battle
        </button>
      </div>
    </div>
  );
}
