import { memo } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignatureField = memo(({ sigRef, setIsSignatureEmpty }: any) => (
  <SignatureCanvas
    ref={sigRef}
    penColor="black"
    backgroundColor="white"
    canvasProps={{ width: 300, height: 120, className: "bg-white" }}
    // onEnd={() => setIsSignatureEmpty(sigRef.current?.isEmpty() ?? true)}
    // onBegin={() => setIsSignatureEmpty(sigRef.current?.isEmpty() ?? true)}
  />
));

export default SignatureField;
