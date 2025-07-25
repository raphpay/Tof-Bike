interface OtpFormProps {
  otp: string;
  resendTimer: number;
  setOtp: (value: string) => void;
  setResendTimer: (value: number) => void;
  handleNext: () => void;
}

const OtpForm: React.FC<OtpFormProps> = ({
  otp,
  resendTimer,
  setResendTimer,
  setOtp,
  handleNext,
}) => {
  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Code OTP"
        maxLength={6}
        className="w-40 rounded border p-2 text-center"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        className="rounded bg-blue-600 px-4 py-2 text-white"
        onClick={handleNext}
        disabled={otp.length !== 6}
      >
        Vérifier le code
      </button>
      <p className="text-sm text-gray-500">
        {resendTimer > 0 ? (
          `Renvoyer le code dans ${resendTimer}s`
        ) : (
          <button onClick={() => setResendTimer(30)} className="underline">
            Renvoyer le code
          </button>
        )}
      </p>
    </div>
  );
};

export default OtpForm;
