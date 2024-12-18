import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import AccountBalance from "@/components/AccountBalance";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useGetTransactionHistoryQuery } from "@/slices/userApiSlice";

function Transaction() {
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [limit, setLimit] = useState(10);

  const {
    data: transactions,
    isLoading,
    error,
  } = useGetTransactionHistoryQuery({ limit });

  console.log(transactions);
  

  const handleTabChange = (month) => {
    setSelectedMonth(month);
  };

  const handleLimitChange = (value) => {
    setLimit(value);
  };

  return (
    <section className="space-y-8">
      {/* Account Balance */}
      <AccountBalance />

      {/* Filter Bulan */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Semua Transaksi</h2>
        <Tabs
          value={selectedMonth}
          onValueChange={handleTabChange}
          className="mt-2"
        >
          <TabsList>
            <TabsTrigger value="01">Januari</TabsTrigger>
            <TabsTrigger value="02">Februari</TabsTrigger>
            <TabsTrigger value="03">Maret</TabsTrigger>
            <TabsTrigger value="04">April</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Filter Limit */}
      <div className="mt-4">
        <label htmlFor="limit" className="text-lg font-medium text-gray-700">
          Tampilkan jumlah transaksi:
        </label>
        <Select
          value={limit}
          onValueChange={handleLimitChange}
          className="w-32 mt-2"
        >
          <SelectTrigger>
            <SelectValue placeholder="Limit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={10}>10</SelectItem>
            <SelectItem value={20}>20</SelectItem>
            <SelectItem value={50}>50</SelectItem>
            <SelectItem value={100}>100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Menampilkan data transaksi */}
      <div className="mt-6">
        {isLoading && <Loader className="animate-spin size-4" />}
        {error && (
          <p className="text-red-500">
            {error.message || "Gagal mengambil data transaksi"}
          </p>
        )}
        {!isLoading && !error && transactions && (
          <div>
            {transactions.data.records.length === 0 ? (
              <p>Tidak ada transaksi untuk bulan ini</p>
            ) : (
              <ul className="space-y-4">
                {transactions.data.records.map((transaction) => {
                  const isTopUp = transaction.transaction_type === "TOPUP";
                  const isPayment = transaction.transaction_type === "PAYMENT";
                  return (
                    <li
                      key={transaction.invoice_number}
                      className="p-4 bg-white rounded-lg transition-all border border-gray-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {isTopUp ? (
                            <Plus className="text-green-500 size-5 " />
                          ) : isPayment ? (
                            <Minus className="text-red-500 size-5" />
                          ) : null}
                          <h3
                            className={
                              isTopUp
                                ? "text-green-500 text-xl font-semibold"
                                : isPayment
                                ? "text-red-500 text-xl font-semibold"
                                : ""
                            }
                          >
                            {transaction.total_amount.toLocaleString()}
                          </h3>
                        </div>
                        <p className="text-sm font-medium">
                          {transaction.description}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        {formatDate(transaction.created_on)}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default Transaction;
