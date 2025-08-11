import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignatureField({
  onSave,
}: {
  onSave: (dataUrl: string | undefined) => void;
}) {
  const sigRef = useRef<SignatureCanvas>(null);
  const [fullScreen, setFullScreen] = useState(false);

  const clear = () => sigRef.current?.clear();
  const save = () => {
    if (sigRef.current?.isEmpty()) return alert("Veuillez signer.");
    const dataUrl = sigRef.current?.toDataURL("image/png"); // Base64 PNG
    onSave(dataUrl);
    setFullScreen(false);
  };

  return (
    <div className="w-full">
      {!fullScreen ? (
        <div className="rounded border bg-gray-50 p-2">
          <div className="h-32 border bg-white">
            <SignatureCanvas
              ref={sigRef}
              penColor="black"
              backgroundColor="white"
              canvasProps={{ width: 300, height: 120, className: "sigCanvas" }}
            />
          </div>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              className="rounded border px-3 py-1"
              onClick={() => setFullScreen(true)}
            >
              Plein écran
            </button>
            <button
              type="button"
              className="rounded border px-3 py-1"
              onClick={clear}
            >
              Effacer
            </button>
            <button
              type="button"
              className="rounded border bg-blue-500 px-3 py-1 text-white"
              onClick={save}
            >
              Enregistrer
            </button>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-50 flex flex-col bg-white">
          <div className="flex-1">
            <SignatureCanvas
              ref={sigRef}
              penColor="black"
              backgroundColor="white"
              canvasProps={{ className: "w-full h-full" }}
            />
          </div>
          <div className="flex gap-2 border-t p-4">
            <button onClick={clear} className="rounded border px-4 py-2">
              Effacer
            </button>
            <button
              onClick={save}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Valider
            </button>
            <button
              onClick={() => setFullScreen(false)}
              className="rounded border px-4 py-2"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
