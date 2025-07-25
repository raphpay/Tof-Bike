import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { BikeData } from "../../business-logic/models/Bike"; // Adjust this if needed
import { getAllRentalBikes } from "../../business-logic/services/rentalBikesService";

import Button from "../components/Button";
import BikeSelection from "../sections/rentalSections/BikeSelection";
import Confirmation from "../sections/rentalSections/Confirmation";
import Contract from "../sections/rentalSections/Contract";
import DurationSelection from "../sections/rentalSections/DurationSelection";
import OtpForm from "../sections/rentalSections/OtpForm";
import Summary from "../sections/rentalSections/Summary";

const steps = [
  "Vélo",
  "Durée",
  "Résumé",
  "Contrat",
  "Validation",
  "Confirmation",
];

const RentalPage = () => {
  const navigate = useNavigate();

  const {
    data: bikes = [],
    isLoading,
    isError,
  } = useQuery<BikeData[]>({
    queryKey: ["rentalBikes"],
    queryFn: getAllRentalBikes,
  });

  const [step, setStep] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [accepted, setAccepted] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");
  const [resendTimer, setResendTimer] = useState<number>(30);
  const [selectedBikes, setSelectedBikes] = useState<
    { bikeId: string; size: string; quantity: number }[]
  >([]);

  const handleNext = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleSelect = (bikeId: string, size: string, quantity: number) => {
    setSelectedBikes((prev) => {
      const exists = prev.find((b) => b.bikeId === bikeId && b.size === size);

      if (quantity === 0) {
        return prev.filter((b) => !(b.bikeId === bikeId && b.size === size));
      }

      if (exists) {
        return prev.map((b) =>
          b.bikeId === bikeId && b.size === size ? { ...b, quantity } : b,
        );
      }

      return [...prev, { bikeId, size, quantity }];
    });
  };

  const totalPrice = selectedBikes.reduce((acc, selection) => {
    const bike = bikes.find(
      (b) => b.id === selection.bikeId && b.size === selection.size,
    );
    return acc + (bike?.pricePerHour ?? 0) * selection.quantity;
  }, 0);

  if (isLoading) return <p className="text-center">Chargement des vélos...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500">Erreur lors du chargement.</p>
    );

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
                key={bike.id}
                bike={bike}
                bikes={bikes}
                selectedBikes={selectedBikes}
                onSelect={handleSelect}
              />
            ))}
            <div className="flex-column col-span-full space-y-2">
              <Button
                title="Guide des tailles"
                onClick={() => navigate("/location-bike-sizes")}
                variant="underline"
              />

              <div>
                <p className="mr-4 font-semibold">
                  Prix estimé / heure : {totalPrice.toFixed(2)} €
                </p>

                <p className="text-sm text-gray-400">
                  * Prix dégressif en fonction de la durée de location
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  title="Continuer"
                  onClick={handleNext}
                  disabled={selectedBikes.length === 0}
                />
                <Button
                  title="Effacer la sélection"
                  onClick={() => setSelectedBikes([])}
                  variant="underline"
                />
              </div>
            </div>
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
            selectedBikes={selectedBikes}
            startTime={startTime}
            endTime={endTime}
            handleNext={handleNext}
            handleBack={handleBack}
            bikes={bikes}
            duration={duration}
          />
        )}
        {step === 3 && (
          <Contract
            accepted={accepted}
            setAccepted={setAccepted}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
        {step === 4 && (
          <OtpForm
            otp={otp}
            setOtp={setOtp}
            resendTimer={resendTimer}
            setResendTimer={setResendTimer}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
        {step === 5 && (
          <Confirmation selectedBikeCount={selectedBikes.length} />
        )}
      </div>
    </div>
  );
};

export default RentalPage;
