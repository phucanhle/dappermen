import React from "react";
import Link from "next/link";
import Button from "./Button";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel = "Browse Products",
  actionHref = "/",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      {icon ? (
        <div className="mb-6 text-neutral-300">{icon}</div>
      ) : (
        <div className="mb-6 w-16 h-16 rounded-full bg-surface-secondary flex items-center justify-center">
          <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
          </svg>
        </div>
      )}
      <h3 className="font-serif text-xl font-normal text-neutral-900 mb-2">{title}</h3>
      {description && (
        <p className="text-sm text-neutral-500 font-sans mb-6 text-center max-w-sm">{description}</p>
      )}
      <Link href={actionHref}>
        <Button variant="primary" size="md">{actionLabel}</Button>
      </Link>
    </div>
  );
}
