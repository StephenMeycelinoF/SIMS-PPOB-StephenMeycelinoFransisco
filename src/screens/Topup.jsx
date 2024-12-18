import AccountBalance from "@/components/AccountBalance";
import StatusModal from "@/components/StatusModal";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import InputWithIcons from "@/components/ui/inputWithIcons";
import { useGetBalanceQuery, useTopUpBalanceMutation } from "@/slices/userApiSlice";
import { RectangleEllipsisIcon } from "lucide-react";
import { useState } from "react";

function Topup() {
  const [amount, setAmount] = useState("");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [topUpBalance, { isLoading }] = useTopUpBalanceMutation();
  const { refetch: refetchBalance } = useGetBalanceQuery();

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSelectAmount = (value) => {
    setAmount(value);
  };

  const handleSubmit = async () => {
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setStatusMessage("Masukkan nominal yang valid (lebih besar dari 0).");
      setStatus("error");
      setIsStatusModalOpen(true);
      return;
    }

    try {
      const response = await topUpBalance({ top_up_amount: Number(amount) }).unwrap();

      const balance = response?.data?.balance;

      if (balance) {
        setStatus("success");
        setStatusMessage(`Top up sebesar Rp ${balance} berhasil!`);
        refetchBalance(); 
      } else {
        setStatus("error");
        setStatusMessage("Saldo tidak ditemukan.");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setStatusMessage(error?.data?.message || "gagal");
    }

    setIsStatusModalOpen(true); // Open the result modal after submit
  };

  const topUpOptions = [10000, 20000, 50000, 100000, 250000, 500000];

  return (
    <section className="space-y-8">
      <AccountBalance />
      <div>
        <Title title={"Silahkan masukkan"} subtitle={"Nominal Top Up"} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[50%_50%] xl:grid-cols-[65%_35%] gap-6 items-start">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!amount || isLoading) return;
            setStatus("confirm");
            setIsStatusModalOpen(true); // Open confirmation modal
          }}
        >
          <div className="relative">
            <InputWithIcons
              id="top-up-input"
              name="topUpAmount"
              leftIcon={RectangleEllipsisIcon}
              placeholder="Masukkan Nominal Top Up"
              value={amount}
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <Button
            variant={amount ? "default" : "secondary"}
            isDisabled={!amount || isLoading}
            isLoading={isLoading}
            type="submit"
            className="w-full"
          >
            Top Up
          </Button>
        </form>

        <div className="grid grid-cols-3 gap-4">
          {topUpOptions.map((option) => (
            <Button
              variant="ghost"
              key={option}
              type="button"
              onClick={() => handleSelectAmount(option)}
              className="border text-gray-600 rounded-lg text-center text-sm lg:text-base font-medium cursor-pointer hover:bg-gray-200"
            >
              Rp{option.toLocaleString("id-ID")}
            </Button>
          ))}
        </div>
      </div>

      {/* Status Modal - handle success/error or confirmation */}
      <StatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        status={status}
        message={statusMessage}
        amount={amount}
        title={status === "confirm" ? "Konfirmasi Top Up" : ""}
        onConfirm={handleSubmit} // Proceed with top-up action
        onCancel={() => setIsStatusModalOpen(false)} // Close modal without action
        onContinue={status === "success" || status === "error" ? () => setIsStatusModalOpen(false) : undefined} // Close on success/error
      />
    </section>
  );
}

export default Topup;
