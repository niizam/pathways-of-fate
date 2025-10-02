import { useEffect, useState } from 'react';
import { profile } from '../utils/api';
import { useAuthStore } from '../utils/store';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [profileData, setProfileData] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [profileRes, statsRes] = await Promise.all([
        profile.get(),
        profile.getStats(),
      ]);
      setProfileData(profileRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        Welcome back, {user?.username}!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <div className="text-gray-400 text-sm mb-2">Account Level</div>
          <div className="text-3xl font-bold text-primary">
            {profileData?.user.account_level}
          </div>
        </div>

        <div className="card">
          <div className="text-gray-400 text-sm mb-2">Fate Tokens</div>
          <div className="text-3xl font-bold text-yellow-500">
            {profileData?.user.fate_tokens}
          </div>
        </div>

        <div className="card">
          <div className="text-gray-400 text-sm mb-2">Gold</div>
          <div className="text-3xl font-bold text-orange-500">
            {profileData?.user.gold?.toLocaleString()}
          </div>
        </div>

        <div className="card">
          <div className="text-gray-400 text-sm mb-2">Stamina</div>
          <div className="text-3xl font-bold text-green-500">
            {profileData?.user.stamina}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Collection</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Characters</span>
              <span className="font-semibold">
                {profileData?.stats.charactersOwned}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">5★ Characters</span>
              <span className="font-semibold text-yellow-500">
                {profileData?.stats.fiveStarCharacters}
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Progress</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Story Chapter</span>
              <span className="font-semibold">
                {profileData?.stats.storyProgress?.max_chapter || 0}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Stages Cleared</span>
              <span className="font-semibold">
                {profileData?.stats.storyProgress?.stages_cleared || 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {stats && (
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Gacha Statistics</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-gray-400 text-sm mb-1">Total Pulls</div>
              <div className="text-2xl font-bold">{stats.gacha.total_pulls}</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">5★ Pulls</div>
              <div className="text-2xl font-bold text-yellow-500">
                {stats.gacha.five_star_pulls}
              </div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">4★ Pulls</div>
              <div className="text-2xl font-bold text-purple-500">
                {stats.gacha.four_star_pulls}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 card bg-primary/10 border-primary">
        <h2 className="text-xl font-bold mb-4">🎮 Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/characters" className="button-primary text-center">
            View Characters
          </a>
          <a href="/gacha" className="button-secondary text-center">
            Pull Gacha
          </a>
          <a href="/battle" className="button-primary text-center">
            Start Battle
          </a>
          <a href="/inventory" className="button-secondary text-center">
            Inventory
          </a>
        </div>
      </div>
    </div>
  );
}
