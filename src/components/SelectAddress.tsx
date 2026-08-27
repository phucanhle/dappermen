"use client";

import { useEffect, useState } from "react";
import { ShippingAddress } from "@/types/ShippingAddress";

type ProvinceData = {
  matinhBNV: string;
  tentinhmoi: string;
  phuongxa: {
    maphuongxa: number;
    tenphuongxa: string;
  }[];
};

type SelectAddressProps = {
  value: ShippingAddress;
  onChange: (val: ShippingAddress) => void;
};

export default function AddressForm({ value, onChange }: SelectAddressProps) {
  const [data, setData] = useState<ProvinceData[]>([]);

  useEffect(() => {
    fetch("/danhmucxaphuong.json")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error("Failed to load address data:", err));
  }, []);

  const selectedProvince = data.find((p) => p.tentinhmoi === value.province);

  return (
    <div className="space-y-4">
      {/* Province */}
      <div>
        <label htmlFor="province-select" className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">Province / City</label>
        <select
          id="province-select"
          value={value.province}
          onChange={(e) =>
            onChange({
              ...value,
              province: e.target.value,
              ward: "", 
            })
          }
          className="w-full px-3 py-2.5 border border-border-default rounded-lg text-sm bg-surface-secondary/30 font-sans focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-200 transition-colors cursor-pointer"
        >
          <option value="">-- Select a province --</option>
          {data.map((item) => (
            <option key={item.matinhBNV} value={item.tentinhmoi}>
              {item.tentinhmoi}
            </option>
          ))}
        </select>
      </div>

      {/* Ward */}
      <div>
        <label htmlFor="ward-select" className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">Ward</label>
        <select
          id="ward-select"
          value={value.ward}
          onChange={(e) => onChange({ ...value, ward: e.target.value })}
          className="w-full px-3 py-2.5 border border-border-default rounded-lg text-sm bg-surface-secondary/30 font-sans focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-200 transition-colors cursor-pointer disabled:opacity-50"
          disabled={!selectedProvince}
        >
          <option value="">
            {selectedProvince ? "-- Select a ward --" : "Select province first"}
          </option>
          {selectedProvince?.phuongxa.map((px) => (
            <option key={px.maphuongxa} value={px.tenphuongxa}>
              {px.tenphuongxa}
            </option>
          ))}
        </select>
      </div>

      {/* Street */}
      <div>
        <label htmlFor="street-input" className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">Street</label>
        <input
          id="street-input"
          type="text"
          value={value.street}
          onChange={(e) => onChange({ ...value, street: e.target.value })}
          className="w-full px-3 py-2.5 border border-border-default rounded-lg text-sm bg-surface-secondary/30 font-sans focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-200 transition-colors"
        />
      </div>

      {/* Details */}
      <div>
        <label htmlFor="details-input" className="block mb-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">House No. / Additional Details</label>
        <input
          id="details-input"
          type="text"
          value={value.details}
          onChange={(e) => onChange({ ...value, details: e.target.value })}
          className="w-full px-3 py-2.5 border border-border-default rounded-lg text-sm bg-surface-secondary/30 font-sans focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-200 transition-colors"
        />
      </div>
    </div>
  );
}
