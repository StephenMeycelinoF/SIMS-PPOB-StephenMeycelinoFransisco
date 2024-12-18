import AccountBalance from "@/components/AccountBalance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputWithIcons from "@/components/ui/inputWithIcons";
import { useCreateTransactionMutation } from "@/slices/transactionApiSlice";
import {
  resetTransaction,
  setError,
  setInvoiceNumber,
} from "@/slices/transactionSlice";
import { CreditCard } from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const Payment = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { serviceCode, serviceTariff } = location.state || {};

  const [serviceCodeInput, setServiceCodeInput] = useState(serviceCode || "");
  const [serviceTariffInput, setServiceTariffInput] = useState(
    serviceTariff || ""
  );
  const [isLoading, setIsLoading] = useState(false);

  const [createTransaction, { isLoading: isTransactionLoading, error }] =
    useCreateTransactionMutation();

  useEffect(() => {
    dispatch(resetTransaction());
  }, [dispatch, serviceCode, serviceTariff]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await createTransaction(serviceCodeInput).unwrap();

      dispatch(setInvoiceNumber(result.invoice_number));
    } catch (err) {
      dispatch(setError(err.message || "Terjadi kesalahan"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="space-y-8">
      <AccountBalance />
      <div>
        <form onSubmit={handleSubmit}>
          <Input
            type="hidden"
            placeholder="Masukkan Service Code"
            value={serviceCodeInput}
            onChange={(e) => setServiceCodeInput(e.target.value)}
            required
          />
          <InputWithIcons
            leftIcon={CreditCard}
            type="text"
            placeholder="Service Tariff"
            value={serviceTariffInput}
            readOnly
          />
          <Button
            type="submit"
            isLoading={isLoading || isTransactionLoading}
            disabled={isLoading || isTransactionLoading}
          >
            Kirim
          </Button>
        </form>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </section>
  );
};

export default Payment;
