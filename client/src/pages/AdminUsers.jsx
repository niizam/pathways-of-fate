import { useEffect, useState } from 'react';
import { admin } from '../utils/api';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 0 });
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    loadUsers();
  }, [pagination.page]);

  const loadUsers = async () => {
    try {
      const response = await admin.getUsers(pagination.page, pagination.limit);
      setUsers(response.data.users);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserDetails = async (userId) => {
    try {
      const response = await admin.getUserDetails(userId);
      setUserDetails(response.data);
      setEditData({
        fate_tokens: response.data.user.fate_tokens,
        gold: response.data.user.gold,
        account_level: response.data.user.account_level,
      });
    } catch (error) {
      console.error('Failed to load user details:', error);
      alert('Failed to load user details');
    }
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      await admin.updateUser(selectedUser, editData);
      alert('User updated successfully');
      setEditMode(false);
      loadUsers();
      loadUserDetails(selectedUser);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to update user');
    }
  };

  const handleBanUser = async (userId) => {
    if (!confirm('Are you sure you want to ban this user?')) return;

    const reason = prompt('Reason for ban:');
    if (!reason) return;

    try {
      await admin.banUser(userId, reason);
      alert('User banned successfully');
      loadUsers();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to ban user');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Management</h1>

      <div className="card mb-8">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2">ID</th>
                <th className="text-left py-2">Username</th>
                <th className="text-left py-2">Email</th>
                <th className="text-left py-2">Level</th>
                <th className="text-left py-2">Fate Tokens</th>
                <th className="text-left py-2">Gold</th>
                <th className="text-left py-2">Last Login</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-800">
                  <td className="py-2">{user.id}</td>
                  <td className="py-2 font-semibold">{user.username}</td>
                  <td className="py-2 text-sm text-gray-400">{user.email}</td>
                  <td className="py-2">{user.account_level}</td>
                  <td className="py-2 text-yellow-500">{user.fate_tokens}</td>
                  <td className="py-2 text-orange-500">{user.gold.toLocaleString()}</td>
                  <td className="py-2 text-sm text-gray-400">
                    {new Date(user.last_login).toLocaleDateString()}
                  </td>
                  <td className="py-2">
                    <button
                      onClick={() => {
                        setSelectedUser(user.id);
                        loadUserDetails(user.id);
                      }}
                      className="text-primary hover:underline mr-2"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleBanUser(user.id)}
                      className="text-red-500 hover:underline"
                    >
                      Ban
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-400">
            Page {pagination.page} of {pagination.pages} ({pagination.total} total users)
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
              disabled={pagination.page === 1}
              className="button-primary disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
              disabled={pagination.page === pagination.pages}
              className="button-primary disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {selectedUser && userDetails && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="card max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold">{userDetails.user.username}</h2>
                <p className="text-gray-400">{userDetails.user.email}</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <div className="text-gray-400 text-sm">Account Level</div>
                {editMode ? (
                  <input
                    type="number"
                    value={editData.account_level}
                    onChange={(e) => setEditData({ ...editData, account_level: parseInt(e.target.value) })}
                    className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded"
                  />
                ) : (
                  <div className="text-xl font-bold">{userDetails.user.account_level}</div>
                )}
              </div>
              <div>
                <div className="text-gray-400 text-sm">Fate Tokens</div>
                {editMode ? (
                  <input
                    type="number"
                    value={editData.fate_tokens}
                    onChange={(e) => setEditData({ ...editData, fate_tokens: parseInt(e.target.value) })}
                    className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded"
                  />
                ) : (
                  <div className="text-xl font-bold text-yellow-500">{userDetails.user.fate_tokens}</div>
                )}
              </div>
              <div>
                <div className="text-gray-400 text-sm">Gold</div>
                {editMode ? (
                  <input
                    type="number"
                    value={editData.gold}
                    onChange={(e) => setEditData({ ...editData, gold: parseInt(e.target.value) })}
                    className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded"
                  />
                ) : (
                  <div className="text-xl font-bold text-orange-500">{userDetails.user.gold.toLocaleString()}</div>
                )}
              </div>
              <div>
                <div className="text-gray-400 text-sm">World Level</div>
                <div className="text-xl font-bold">{userDetails.user.world_level}</div>
              </div>
            </div>

            {/* Edit Controls */}
            <div className="flex gap-2 mb-6">
              {editMode ? (
                <>
                  <button onClick={handleUpdateUser} className="button-primary">
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="button-secondary"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button onClick={() => setEditMode(true)} className="button-primary">
                  Edit User
                </button>
              )}
            </div>

            {/* Characters */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">Characters ({userDetails.characters.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {userDetails.characters.map((char) => (
                  <div key={char.id} className={`card rarity-${char.rarity} text-sm`}>
                    <div className="font-semibold">{char.character_name}</div>
                    <div className="text-gray-400 text-xs">{char.pathway_name}</div>
                    <div className="text-xs mt-1">Lv {char.level} • E{char.eidolon}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Story Progress */}
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3">Story Progress</h3>
              <div className="text-sm text-gray-400">
                {userDetails.storyProgress.length > 0
                  ? `Completed ${userDetails.storyProgress.filter(p => p.completed).length} stages`
                  : 'No story progress yet'}
              </div>
            </div>

            {/* Recent Gacha */}
            <div>
              <h3 className="text-lg font-bold mb-3">Recent Gacha History (Last 10)</h3>
              <div className="space-y-2">
                {userDetails.gachaHistory.slice(0, 10).map((pull, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center text-sm py-1 border-b border-gray-800"
                  >
                    <span className={`font-semibold ${pull.rarity === 5 ? 'text-yellow-500' : pull.rarity === 4 ? 'text-purple-500' : ''}`}>
                      {pull.item_name} ({pull.rarity}★)
                    </span>
                    <span className="text-gray-400 text-xs">
                      {new Date(pull.pulled_at).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
