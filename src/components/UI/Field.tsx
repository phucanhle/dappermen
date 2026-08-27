"use client";
import React, { ChangeEvent } from "react";

interface FieldProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

interface FieldSelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

function generateId(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  error,
}: FieldProps) {
  const id = generateId(label);
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      <label htmlFor={id} className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 border rounded-lg text-sm bg-surface-secondary/30 font-sans placeholder:text-neutral-400 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-200 transition-colors ${
          error ? "border-red-400" : "border-border-default"
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function FieldSelect({
  label,
  options,
  value,
  onChange,
  className = "",
}: FieldSelectProps) {
  const id = generateId(label);
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      <label htmlFor={id} className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2.5 border border-border-default rounded-lg text-sm bg-surface-secondary/30 font-sans focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-200 transition-colors cursor-pointer"
      >
        <option value="">{`Select ${label}`}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}