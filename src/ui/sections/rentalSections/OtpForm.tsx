import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Button from "../../components/Button";

interface OtpFormProps {
  otp: string;
  resendTimer: number;
  setOtp: (value: string) => void;
  setResendTimer: (value: number) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const OtpForm: React.FC<OtpFormProps> = ({
  otp,
  resendTimer,
  setResendTimer,
  setOtp,
  handleNext,
  handleBack,
}) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState<string | undefined>();
  const [timerStarted, setTimerStarted] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerStarted && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [timerStarted, resendTimer, setResendTimer]);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setIsEmailValid(validateEmail(value));
  };

  const handleSendCode = () => {
    if (!email || !firstName || !lastName || !phone || !isEmailValid) return;
    console.log("Sending OTP to", email, phone);
    setResendTimer(30);
    setTimerStarted(true);
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Prénom"
        className="w-full rounded border p-2"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nom"
        className="w-full rounded border p-2"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className={`w-full rounded border p-2 ${
          !isEmailValid && "border-red-500"
        }`}
        value={email}
        onChange={handleEmailChange}
      />
      <PhoneInput
        defaultCountry="FR"
        countries={["FR", "RE"]}
        placeholder="Numéro de téléphone"
        value={phone}
        onChange={setPhone}
        className="w-full"
      />

      <Button
        title="Envoyer le code"
        onClick={handleSendCode}
        disabled={
          !email ||
          !firstName ||
          !lastName ||
          !phone ||
          timerStarted ||
          !isEmailValid
        }
      />

      {timerStarted && (
        <div className="flex flex-row items-center justify-start gap-2">
          <input
            type="text"
            placeholder="Code OTP"
            maxLength={6}
            className="w-40 rounded border p-2 text-center"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <Button
            title="Vérifier le code"
            onClick={handleNext}
            disabled={otp.length !== 6}
          />
          <p className="text-sm text-gray-500">
            {resendTimer > 0 ? (
              `Renvoyer le code dans ${resendTimer}s`
            ) : (
              <Button
                title="Renvoyer le code"
                onClick={() => {
                  setResendTimer(30);
                  setTimerStarted(true);
                }}
                variant="underline"
              />
            )}
          </p>
        </div>
      )}

      <Button title="Retour" onClick={handleBack} variant="underline" />
    </div>
  );
};

export default OtpForm;
