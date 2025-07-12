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
        <label className="block mb-1 font-medium text-sm">Province / City</label>
        <select
          value={value.province}
          onChange={(e) =>
            onChange({
              ...value,
              province: e.target.value,
              ward: "", 
            })
          }
          className="w-full p-2 border border-gray-400 rounded"
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
        <label className="block mb-1 font-medium text-sm">Ward</label>
        <select
          value={value.ward}
          onChange={(e) => onChange({ ...value, ward: e.target.value })}
          className="w-full p-2 border border-gray-400 rounded disabled:opacity-50"
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
        <label className="block mb-1 font-medium text-sm">Street</label>
        <input
          type="text"
          value={value.street}
          onChange={(e) => onChange({ ...value, street: e.target.value })}
          className="w-full p-2 border border-gray-400 rounded"
        />
      </div>

      {/* Details */}
      <div>
        <label className="block mb-1 font-medium text-sm">House No. / Additional Details</label>
        <input
          type="text"
          value={value.details}
          onChange={(e) => onChange({ ...value, details: e.target.value })}
          className="w-full p-2 border border-gray-400 rounded"
        />
      </div>
    </div>
  );
}
