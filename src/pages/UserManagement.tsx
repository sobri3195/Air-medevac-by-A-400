import React, { useState } from 'react';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { Button } from '../components/UI/Button';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../components/UI/Table';
import { mockUsers } from '../data/mockData';
import { UserPlus, Edit, Trash2 } from 'lucide-react';
import { User, UserRole } from '../types';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const getRoleColor = (role: UserRole) => {
    const colors: Record<UserRole, string> = {
      MISSION_COMMANDER: 'bg-purple-100 text-purple-800',
      FLIGHT_CREW: 'bg-blue-100 text-blue-800',
      MEDICAL_TEAM_LEADER: 'bg-green-100 text-green-800',
      MEDICAL_STAFF: 'bg-yellow-100 text-yellow-800',
      ADMIN: 'bg-red-100 text-red-800',
    };
    return colors[role];
  };

  const getRoleLabel = (role: UserRole) => {
    return role.replace(/_/g, ' ');
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-gray-600 mt-1">Manage system users and their roles</p>
        </div>
        <Button onClick={handleAddUser}>
          <UserPlus size={16} className="mr-2" />
          Add New User
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {Object.entries({
          MISSION_COMMANDER: users.filter(u => u.role === 'MISSION_COMMANDER').length,
          FLIGHT_CREW: users.filter(u => u.role === 'FLIGHT_CREW').length,
          MEDICAL_TEAM_LEADER: users.filter(u => u.role === 'MEDICAL_TEAM_LEADER').length,
          MEDICAL_STAFF: users.filter(u => u.role === 'MEDICAL_STAFF').length,
          ADMIN: users.filter(u => u.role === 'ADMIN').length,
        }).map(([role, count]) => (
          <Card key={role}>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">{getRoleLabel(role as UserRole)}</p>
              <p className="text-3xl font-bold text-blue-600">{count}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Role</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge className={getRoleColor(user.role)}>
                    {getRoleLabel(user.role)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditUser(user)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit user"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete user"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold mb-4">
              {editingUser ? 'Edit User' : 'Add New User'}
            </h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={editingUser?.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={editingUser?.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="user@airmedevac.mil"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select
                  defaultValue={editingUser?.role}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="MISSION_COMMANDER">Mission Commander</option>
                  <option value="FLIGHT_CREW">Flight Crew</option>
                  <option value="MEDICAL_TEAM_LEADER">Medical Team Leader</option>
                  <option value="MEDICAL_STAFF">Medical Staff</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  {editingUser ? 'Update User' : 'Create User'}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
