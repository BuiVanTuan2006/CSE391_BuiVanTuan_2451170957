import {
  useEffect,
  useState,
} from "react";

import { api } from "./services/api";

import { ui } from "./utils/ui";

import UserForm from "./components/UserForm";
import UserList from "./components/UserList";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";

function App() {

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [editingUser,
    setEditingUser] =
    useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {

      setLoading(true);

      const data =
        await api.getUsers();

      setUsers(data);

    } catch (error) {

      ui.showError(
        "Load users failed"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleCreateOrUpdate =
    async (userData) => {

      try {

        if (editingUser) {

          const updated =
            await api.updateUser(
              editingUser.id,
              userData
            );

          setUsers(
            users.map((u) =>
              u.id === editingUser.id
                ? {
                    ...u,
                    ...updated,
                  }
                : u
            )
          );

          setEditingUser(null);

          ui.showSuccess(
            "Updated successfully"
          );

        } else {

          const created =
            await api.createUser(
              userData
            );

          created.id = Date.now();

          setUsers([
            created,
            ...users,
          ]);

          ui.showSuccess(
            "Created successfully"
          );
        }

      } catch {

        ui.showError(
          "Save failed"
        );

      }
    };

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this user?"
        );

      if (!confirmDelete)
        return;

      try {

        await api.deleteUser(id);

        setUsers(
          users.filter(
            (u) => u.id !== id
          )
        );

        ui.showSuccess(
          "Deleted successfully"
        );

      } catch {

        ui.showError(
          "Delete failed"
        );

      }
    };

  const filteredUsers =
    users.filter(
      (user) =>
        user.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        user.email
          .toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <div>

      <h1>
        User Directory
      </h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <UserForm
        onSubmit={
          handleCreateOrUpdate
        }
        editingUser={
          editingUser
        }
      />

      {loading ? (
        <Loading />
      ) : (
        <UserList
          users={filteredUsers}
          onEdit={
            setEditingUser
          }
          onDelete={
            handleDelete
          }
        />
      )}

    </div>
  );
}

export default App;