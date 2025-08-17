import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button as NeoButton } from "../../../components/ui/button";
import LabelInput from "../../components/LabelInput";
import RentalNavBar from "../../components/RentalNavBar";
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
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-4">
      <RentalNavBar />

      {/* Bouton retour */}
      <div className="mb-2 w-full max-w-sm">
        <NeoButton
          variant="neutral"
          className="flex items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Retour
        </NeoButton>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-background w-full max-w-sm border-2 p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      >
        <h2 className="mb-4 text-center text-xl font-bold">Connexion Admin</h2>

        <LabelInput
          label="Adresse e-mail"
          value={email}
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@tofbike.fr"
          required
        />

        <LabelInput
          label="Mot de passe"
          value={password}
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="motdepasse974"
          required
        />

        {error && <p className="mb-4 text-center text-red-600">{error}</p>}

        <NeoButton className="mt-4" type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </NeoButton>
      </form>
    </div>
  );
}
