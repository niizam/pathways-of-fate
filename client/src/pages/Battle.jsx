import { useState, useEffect, useRef } from 'react';
import { characters as charactersApi, battle as battleApi } from '../utils/api';

export default function Battle() {
  const [characters, setCharacters] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [battleState, setBattleState] = useState(null);
  const [stageId, setStageId] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const logsEndRef = useRef(null);

  useEffect(() => {
    loadCharacters();
  }, []);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [battleState?.logs]);

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
      setSelectedCharacter(null);
      setSelectedAction(null);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to start battle');
    }
  };

  const performAction = async (targetId) => {
    if (!battleState || !selectedCharacter || !selectedAction) return;

    try {
      const response = await battleApi.action(battleState.battleId, {
        characterId: selectedCharacter.id,
        actionType: selectedAction,
        targetId,
      });
      
      setBattleState(prev => ({
        ...response.data.battleState,
        battleId: prev.battleId
      }));
      
      setSelectedCharacter(null);
      setSelectedAction(null);

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

  const selectCharacterAction = (char, actionType) => {
    setSelectedCharacter(char);
    setSelectedAction(actionType);
  };

  if (battleState) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Battle - Turn {battleState.turn}</h1>

        {selectedCharacter && selectedAction && (
          <div className="card mb-4 bg-primary/10 border-primary">
            <div className="text-center">
              <p className="text-lg font-semibold">
                {selectedCharacter.character_name} - {selectedAction === 'basic_attack' ? 'Basic Attack' : selectedAction === 'skill' ? 'Skill' : 'Ultimate'}
              </p>
              <p className="text-sm text-gray-400 mt-1">Click on an enemy to attack</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="card">
            <h2 className="text-xl font-bold mb-4 text-green-500">Your Team</h2>
            <div className="space-y-2">
              {battleState.team.map((char) => {
                const basicSkill = char.skills?.find(s => s.type === 'basic_attack' || s.type === 'basic');
                const regularSkill = char.skills?.find(s => s.type === 'skill');
                const ultimate = char.skills?.find(s => s.type === 'ultimate');
                
                return (
                  <div key={char.id} className="bg-gray-800 p-3 rounded">
                    <div className="flex justify-between mb-2">
                      <div>
                        <span className="font-semibold">{char.character_name}</span>
                        <div className="text-xs text-gray-500">{char.pathway_name}</div>
                      </div>
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
                    <div className="text-xs text-gray-400 mb-2">
                      HP: {char.currentHp}/{char.hp}
                    </div>
                    
                    {char.currentHp > 0 && battleState.enemies.length > 0 && (
                      <div className="space-y-1">
                        <div className="flex gap-2 flex-wrap">
                          <button
                            onClick={() => selectCharacterAction(char, 'basic_attack')}
                            className={`text-xs py-1 px-2 rounded transition ${
                              selectedCharacter?.id === char.id && selectedAction === 'basic_attack'
                                ? 'bg-primary text-white'
                                : 'button-primary'
                            }`}
                            title={basicSkill?.name || 'Basic Attack'}
                          >
                            {basicSkill?.name || 'Basic'}
                          </button>
                          {char.energy >= 2 && (
                            <button
                              onClick={() => selectCharacterAction(char, 'skill')}
                              className={`text-xs py-1 px-2 rounded transition ${
                                selectedCharacter?.id === char.id && selectedAction === 'skill'
                                  ? 'bg-primary text-white'
                                  : 'button-secondary'
                              }`}
                              title={regularSkill?.name || 'Skill'}
                            >
                              {regularSkill?.name || 'Skill'}
                            </button>
                          )}
                          {char.energy >= 4 && (
                            <button
                              onClick={() => selectCharacterAction(char, 'ultimate')}
                              className={`text-xs py-1 px-2 rounded transition ${
                                selectedCharacter?.id === char.id && selectedAction === 'ultimate'
                                  ? 'bg-yellow-400 text-black'
                                  : 'bg-yellow-600 hover:bg-yellow-500 text-white'
                              }`}
                              title={ultimate?.name || 'Ultimate'}
                            >
                              {ultimate?.name || 'Ultimate'}
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold mb-4 text-red-500">Enemies</h2>
            <div className="space-y-2">
              {battleState.enemies.map((enemy) => (
                <div 
                  key={enemy.id} 
                  onClick={() => selectedCharacter && selectedAction && performAction(enemy.id)}
                  className={`p-3 rounded transition cursor-pointer ${
                    enemy.isBoss 
                      ? 'bg-red-900/30 border-2 border-red-500' 
                      : 'bg-gray-800'
                  } ${
                    selectedCharacter && selectedAction 
                      ? 'hover:border-primary hover:scale-105' 
                      : ''
                  }`}
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

        {battleState.logs && battleState.logs.length > 0 && (
          <div className="card mb-4">
            <h2 className="text-xl font-bold mb-4">Battle Log</h2>
            <div className="bg-gray-900 p-4 rounded max-h-64 overflow-y-auto">
              <div className="space-y-1 text-sm">
                {battleState.logs.map((log, idx) => (
                  <div 
                    key={idx} 
                    className={`${
                      log.type === 'victory' ? 'text-green-400 font-bold' :
                      log.type === 'defeat' ? 'text-red-400 font-bold' :
                      log.type === 'ultimate' ? 'text-yellow-400' :
                      log.type === 'enemy_action' ? 'text-red-300' :
                      log.type === 'ko' ? 'text-red-500' :
                      'text-gray-300'
                    }`}
                  >
                    <span className="text-gray-500">[Turn {log.turn}]</span> {log.message}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            </div>
          </div>
        )}

        <div className="text-center space-x-4">
          <button
            onClick={() => {
              setSelectedCharacter(null);
              setSelectedAction(null);
            }}
            disabled={!selectedCharacter}
            className="button-secondary disabled:opacity-50"
          >
            Cancel Selection
          </button>
          <button
            onClick={() => {
              setBattleState(null);
              setSelectedCharacter(null);
              setSelectedAction(null);
            }}
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
