import { useNavigate } from "react-router-dom";
import { useLoginPage } from "./useLoginPage";

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    handleSubmit,
  } = useLoginPage();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      {/* Bouton retour */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 self-start rounded bg-gray-300 px-4 py-2 hover:bg-gray-400"
      >
        ← Retour
      </button>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded bg-white p-6 shadow-md"
      >
        <h2 className="mb-4 text-center text-xl font-bold">Connexion Admin</h2>

        <label className="mb-2 block font-medium" htmlFor="email">
          Adresse e-mail
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mb-4 w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        <label className="mb-2 block font-medium" htmlFor="password">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mb-4 w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        {error && <p className="mb-4 text-center text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary-dark w-full rounded py-2 text-white disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
