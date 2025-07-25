import { useEffect, useState } from "react";
import type Bike from "../../business-logic/models/Bike";

import BikeSelection from "../sections/rentalSections/BikeSelection";
import Confirmation from "../sections/rentalSections/Conformation";
import Contract from "../sections/rentalSections/Contract";
import DurationSelection from "../sections/rentalSections/DurationSelection";
import OtpForm from "../sections/rentalSections/OtpForm";
import Summary from "../sections/rentalSections/Summary";

// Dummy bike data
const bikes: Bike[] = [
  {
    id: 1,
    name: "VTT Explorer",
    available: true,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "City Cruiser",
    available: false,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Road Runner",
    available: true,
    image: "https://via.placeholder.com/150",
  },
];

const steps = [
  "Vélo",
  "Durée",
  "Résumé",
  "Contrat",
  "Validation",
  "Confirmation",
];

const RentalPage = () => {
  const [step, setStep] = useState<number>(0);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [accepted, setAccepted] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [resendTimer, setResendTimer] = useState<number>(30);

  useEffect(() => {
    let timer;
    if (step === 4 && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [step, resendTimer]);

  const handleNext = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <div className="bg-background-light flex min-h-screen items-center justify-center px-4">
      <div className="bg-primary-lighter w-full max-w-4xl space-y-6 rounded-2xl p-6 shadow-lg">
        {/* Step Titles */}
        <div className="text-primary-light flex items-center justify-between text-sm font-medium">
          {steps.map((title, idx) => (
            <div
              key={idx}
              className={`flex-1 text-center ${step === idx ? "text-primary font-bold" : ""}`}
            >
              {title}
            </div>
          ))}
        </div>

        {/* Step Content */}
        {step === 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {bikes.map((bike) => (
              <BikeSelection
                bike={bike}
                onSelect={(selectedBike: Bike) => {
                  setSelectedBike(selectedBike);
                  handleNext();
                }}
              />
            ))}
          </div>
        )}
        {step === 1 && (
          <DurationSelection
            startTime={startTime}
            endTime={endTime}
            duration={duration}
            setDuration={setDuration}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
        {step === 2 && (
          <Summary
            selectedBike={selectedBike}
            startTime={startTime}
            endTime={endTime}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
        {step === 3 && (
          <Contract
            accepted={accepted}
            setAccepted={setAccepted}
            handleNext={handleNext}
          />
        )}
        {step === 4 && (
          <OtpForm
            otp={otp}
            setOtp={setOtp}
            resendTimer={resendTimer}
            setResendTimer={setResendTimer}
            handleNext={handleNext}
          />
        )}
        {step === 5 && <Confirmation />}
      </div>
    </div>
  );
};

export default RentalPage;
