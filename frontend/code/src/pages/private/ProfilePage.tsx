import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const { user } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();

    setTimeout(() => {
      setSuccessMessage("Perfil actualizado correctamente");
      setIsEditing(false);

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    }, 800);
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <article className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <header className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-16 relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="h-32 w-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center text-gray-500">
                {user?.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={user.name}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold">
                    {user?.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
          </header>

          <div className="px-6 py-12 pt-20">
            {successMessage && (
              <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                <p>{successMessage}</p>
              </div>
            )}

            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            {isEditing ? (
              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Guardar Cambios
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">
                      Nombre
                    </h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {user?.name}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">
                      Correo Electrónico
                    </h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {user?.email}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">
                      ID de Usuario
                    </h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      {user?.id}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500">
                      Fecha de Registro
                    </h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">
                      1 de enero de 2025
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Editar Perfil
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </section>
  );
};

export default ProfilePage;
