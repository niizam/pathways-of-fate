import { useEffect, useState } from 'react';
import { admin } from '../utils/api';

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [systemStats, setSystemStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [analyticsRes, systemRes] = await Promise.all([
        admin.getAnalytics(),
        admin.getSystem(),
      ]);
      setAnalytics(analyticsRes.data);
      setSystemStats(systemRes.data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load admin data. Admin access required.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading admin dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card bg-red-900/50 border-red-500">
          <h2 className="text-xl font-bold mb-2">Access Denied</h2>
          <p>{error}</p>
          <p className="text-sm text-gray-400 mt-4">
            Admin access requires an account with email ending in @admin.com
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="card">
          <div className="text-gray-400 text-sm mb-2">Total Users</div>
          <div className="text-3xl font-bold text-primary">
            {analytics?.users.total_users}
          </div>
        </div>

        <div className="card">
          <div className="text-gray-400 text-sm mb-2">Active Daily</div>
          <div className="text-3xl font-bold text-green-500">
            {analytics?.users.active_daily}
          </div>
        </div>

        <div className="card">
          <div className="text-gray-400 text-sm mb-2">Active Weekly</div>
          <div className="text-3xl font-bold text-blue-500">
            {analytics?.users.active_weekly}
          </div>
        </div>

        <div className="card">
          <div className="text-gray-400 text-sm mb-2">Avg Level</div>
          <div className="text-3xl font-bold text-yellow-500">
            {parseFloat(analytics?.users.avg_level || 0).toFixed(1)}
          </div>
        </div>
      </div>

      {/* Gacha & Characters Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Gacha Statistics</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Pulls</span>
              <span className="font-semibold">{analytics?.gacha.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">5★ Obtained</span>
              <span className="font-semibold text-yellow-500">
                {analytics?.gacha.totalFiveStar}
              </span>
            </div>
            {analytics?.gacha.byBanner.map((banner) => (
              <div key={banner.banner_type} className="flex justify-between text-sm">
                <span className="text-gray-400">{banner.banner_type}</span>
                <span>{banner.pulls_by_banner} pulls</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Character Statistics</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Characters</span>
              <span className="font-semibold">{analytics?.characters.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Avg Level</span>
              <span className="font-semibold">
                {parseFloat(analytics?.characters.avgLevel || 0).toFixed(1)}
              </span>
            </div>
            {analytics?.characters.byRarity.map((rarity) => (
              <div key={rarity.rarity} className="flex justify-between text-sm">
                <span className="text-gray-400">{rarity.rarity}★ Characters</span>
                <span>{rarity.count_by_rarity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Players */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Top Players</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2">Rank</th>
                <th className="text-left py-2">Username</th>
                <th className="text-left py-2">Level</th>
                <th className="text-left py-2">World Level</th>
                <th className="text-left py-2">Fate Tokens</th>
                <th className="text-left py-2">Gold</th>
              </tr>
            </thead>
            <tbody>
              {systemStats?.topPlayers.map((player, index) => (
                <tr key={player.username} className="border-b border-gray-800">
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2 font-semibold">{player.username}</td>
                  <td className="py-2">{player.account_level}</td>
                  <td className="py-2">{player.world_level}</td>
                  <td className="py-2 text-yellow-500">{player.fate_tokens}</td>
                  <td className="py-2 text-orange-500">{player.gold.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popular Characters */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Most Popular Characters</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {systemStats?.popularCharacters.map((char) => (
            <div key={char.character_name} className="text-center">
              <div className="text-2xl font-bold text-primary">{char.count}</div>
              <div className="text-sm text-gray-400">{char.character_name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Recent Rare Pulls (4★+)</h2>
        <div className="space-y-2">
          {systemStats?.recentActivity.map((activity, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b border-gray-800"
            >
              <div>
                <span className="font-semibold">{activity.username}</span>
                <span className="text-gray-400 ml-2">obtained</span>
                <span className={`ml-2 font-semibold ${activity.rarity === 5 ? 'text-yellow-500' : 'text-purple-500'}`}>
                  {activity.item_name} ({activity.rarity}★)
                </span>
              </div>
              <div className="text-sm text-gray-500">
                {new Date(activity.pulled_at).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Active Users Trend */}
      {analytics?.trends.daily && analytics.trends.daily.length > 0 && (
        <div className="card mt-8">
          <h2 className="text-xl font-bold mb-4">Daily Active Users (Last 7 Days)</h2>
          <div className="space-y-2">
            {analytics.trends.daily.map((day) => (
              <div key={day.date} className="flex justify-between">
                <span className="text-gray-400">
                  {new Date(day.date).toLocaleDateString()}
                </span>
                <span className="font-semibold">{day.active_users} users</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Database Stats */}
      <div className="card mt-8">
        <h2 className="text-xl font-bold mb-4">Database Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{systemStats?.database.users}</div>
            <div className="text-sm text-gray-400">Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{systemStats?.database.characters}</div>
            <div className="text-sm text-gray-400">Characters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{systemStats?.database.weapons}</div>
            <div className="text-sm text-gray-400">Weapons</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500">{systemStats?.database.gacha_pulls}</div>
            <div className="text-sm text-gray-400">Gacha Pulls</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">{systemStats?.database.story_progress}</div>
            <div className="text-sm text-gray-400">Story Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
}
