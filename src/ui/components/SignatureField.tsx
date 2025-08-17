import { memo } from "react";
import SignatureCanvas from "react-signature-canvas";

const SignatureField = memo(({ sigRef }: any) => (
  <SignatureCanvas
    ref={sigRef}
    penColor="black"
    backgroundColor="white"
    canvasProps={{ width: 300, height: 120, className: "bg-white" }}
  />
));

export default SignatureField;
