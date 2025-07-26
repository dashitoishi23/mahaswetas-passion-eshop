import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCart } from "@/lib/cart";
import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useLocation } from "wouter";

export function CartOverlay() {
  const { items, removeItem, updateQuantity, total } = useCart();
  const [, setLocation] = useLocation();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-4 w-4" />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-200px)] mt-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 py-4 border-b"
            >
              <img
                src={item.product.imageUrl[0]}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium">{item.product.name}</h4>
                <p className="text-sm text-muted-foreground">
                  ₹{item.product.price}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.product.name)}
                    disabled={item.quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span>{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.product.name)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 ml-auto"
                    onClick={() => removeItem(item.product.id, item.product.name)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background">
          <div className="flex justify-between mb-4">
            <span className="font-medium">Total</span>
            <span className="font-bold">₹{total().toFixed(2)}</span>
          </div>
          <Button
            className="w-full"
            onClick={() => setLocation("/checkout")}
            disabled={items.length === 0}
          >
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}