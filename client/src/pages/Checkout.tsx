import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/cart";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { useEffect } from "react";

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(10, "Please enter your full address"),
});

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
}, []);

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      email: "",
      address: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof checkoutSchema>) => {
      const response = await apiRequest("POST", "/api/orders", {
        ...values,
        total: total().toFixed(2),
        items: items.map(item => `${item.product.name} (${item.quantity})`),
      });

      const responseBody = await response.json();

      let razorpayResponse = {};
      
      const options = {
        key: responseBody.razorpayKeyId,
        amount: responseBody.amount,
        currency: "INR",
        name: "Your Store",
        description: "Purchase",
        order_id: responseBody.orderId,
        handler: async (response: any) => {
          await apiRequest("POST", "/api/orders/verify", {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            orderData: {
              ...values,
              total: total().toFixed(2),
              items: items.map(item => `${item.product.name} (${item.quantity})`),
            }
          });
          razorpayResponse = response;
          console.log({ response })
          clearCart();
          toast({
            title: "Payment successful!",
            description: "Thank you for your purchase.",
          });
          setLocation("/");
        },
        prefill: {
          name: values.customerName,
          email: values.email,
        },
      };
      
      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
      razorpay.on('payment.failed', function (response: any){
        console.log(response);
      });
    },
  });

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button onClick={() => setLocation("/catalog")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8">Checkout</h1>

        <div className="mb-8 space-y-4">
          <h2 className="font-semibold">Order Summary</h2>
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between">
              <span>
                {item.product.name} x {item.quantity}
              </span>
              <span>
                ₹{(Number(item.product.price) * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="border-t pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{total().toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => mutate(values))}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shipping Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}