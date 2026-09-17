import { Button } from "@/components/atom/Button";
import { Typography } from "@/components/atom/Typography";
import Link from "next/dist/client/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <Typography variant="h1">404</Typography>
      <Typography variant="h2">Page Not Found</Typography>
      <Typography variant="body">
        The page you are looking for does not exist.
      </Typography>
      <Link href="/">
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  );
}
