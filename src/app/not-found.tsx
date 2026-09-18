"use client";

import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/atom/Button";
import { Icon } from "@/components/atom/Icon";
import { Typography } from "@/components/atom/Typography";

export default function NotFound() {
  return (
    <main className="flex min-h-[85vh] w-full flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center">

        <div className="rounded-full border border-slate-800 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-400">
          404 Error
        </div>

        <Typography
          variant="h1"
          className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          Page not found
        </Typography>

        <Typography variant="small" className="mt-3 text-slate-400">
          Sorry, the page you are looking for doesn't exist, was moved, or is
          temporarily unavailable.
        </Typography>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            type="button"
            variant="secondary"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <Icon icon={ArrowLeft} size="sm" className="mr-2" />
            Go back
          </Button>

          <Link href="/">
            <Button variant="primary" className="w-full sm:w-auto">
              <Icon icon={Home} size="sm" className="mr-2" />
              Return home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
