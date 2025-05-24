import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllUsers,
  updateUserRole,
  deleteUser,
} from "../../api/admin";
import { useState } from "react";

const UserManagement = () => {
  const queryClient = useQueryClient();
  const { data: users } = useQuery({queryKey: ["users"], queryFn: fetchAllUsers});
  const [editedRoles, setEditedRoles] = useState<Record<string, string>>({});

  const updateRole = useMutation({
    mutationFn: ({ id, role }: { id: string; role: string }) =>
      updateUserRole(id, role),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["users"]}),
  });

  const removeUser = useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["users"]}),
  });

  const handleRoleChange = (id: string, newRole: string) => {
    setEditedRoles((prev) => ({ ...prev, [id]: newRole }));
  };

  const handleSave = (id: string) => {
    const newRole = editedRoles[id];
    if (!newRole) return;
    updateRole.mutate({ id, role: newRole });
    setEditedRoles((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  if (!users) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">👥 User Management</h2>
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Username</th>
            <th className="p-2 text-left">Num of Articles</th>
            <th className="p-2 text-left">Role</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any) => {
            const pendingChange = editedRoles[user._id];
            const currentRole = pendingChange ?? user.role;
            return (
              <tr key={user._id} className="border-t">
                <td className="p-2">{user.username}</td>
                <td className="p-2">{user.articlesCount || "-"}</td>
                <td className="p-2">
                  <select
                    className="border p-1"
                    value={currentRole}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  >
                    {["admin", "author", "user", "pending"].map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    disabled={!pendingChange || pendingChange === user.role}
                    onClick={() => handleSave(user._id)}
                    className="bg-green-600 text-white px-2 py-1 rounded text-sm disabled:opacity-50"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => removeUser.mutate(user._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
