import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@shared/schema";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { constants } from "@/lib/utils";

export default function ProductDetails() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("Free Size");

  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: ["/api/products", id],
    queryFn: async () => {
      const response = await fetch(`/api/products/${id}`);
      if (!response.ok) {
        throw new Error("Product not found");
      }
      return response.json();
    },
  });

  const handleAddToCart = () => {
    if (product) {
      addItem({
        ...product,
        name: `${product.name} - (${selectedSize})`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-32 mb-6" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-muted aspect-square rounded-lg" />
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-1/4" />
              <div className="h-20 bg-muted rounded" />
              <div className="h-6 bg-muted rounded w-1/3" />
              <div className="h-12 bg-muted rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-8">
        <Link href="/catalog">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Catalog
          </Button>
        </Link>
        <Card className="p-8 text-center">
          <CardContent>
            <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/catalog">
              <Button>Browse Products</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Link href="/catalog">
        <Button variant="ghost" className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Catalog
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <img
              src={product.imageUrl[0]}
              alt={product.name}
              className="object-cover w-full h-full"
              id="main-image"
            />
          </div>
          {/* Thumbnail Images */}
          <div className="grid grid-cols-3 gap-2">
            {
              product.imageUrl.map((imageUrl, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-md border cursor-pointer hover:opacity-75 transition">
                  <img
                    src={imageUrl}
                    alt={`${product.name} view ${index + 1}`}
                    className="object-cover w-full h-full"
                    onClick={() => {
                      // Update main image when thumbnail is clicked
                      const mainImage = document.getElementById(
                        "main-image"
                      ) as HTMLImageElement;
                      if (mainImage) {
                        mainImage.src = imageUrl;
                      }
                    }}
                  />
                </div>
              ))
            }
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              {product.category}
            </Badge>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-3xl font-bold text-primary">₹{product.price}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Size</h3>
            <Select
              onValueChange={(value) => setSelectedSize(value)}
              value={selectedSize}>
                <SelectTrigger>
                  <SelectValue>{selectedSize}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {product.size.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
            </Select>
          </div>
                  
          {/* Add to Cart Button */}
          <Button 
            size="lg" 
            className="w-full" 
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}