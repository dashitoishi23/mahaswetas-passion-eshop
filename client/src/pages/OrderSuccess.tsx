import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function OrderSuccess() {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Order Successful</h1>
        <p className="text-muted-foreground mb-6">
          Your order has been successfully placed. We will send you a confirmation
          email shortly.
        </p>
        <Link href="/catalog">
          <Button>Browse Products</Button>
        </Link>
      </div>
    </div>
  );
}