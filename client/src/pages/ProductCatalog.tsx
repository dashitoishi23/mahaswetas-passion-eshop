import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, type Product } from "@shared/schema";
import { useSearch } from "wouter";
import { Button } from "@/components/ui/button";

export default function ProductCatalog() {
  const [search] = useSearch();
  const searchParams = new URLSearchParams(search);
  const currentCategory = searchParams.get("category");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: currentCategory 
      ? [`/api/products/category/${currentCategory}`]
      : ["/api/products"],
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted aspect-square rounded-lg mb-4" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex gap-4 mb-8 overflow-x-auto pb-4">
        <Button
          variant={!currentCategory ? "default" : "outline"}
          onClick={() => window.history.pushState({}, "", "/catalog")}
        >
          All
        </Button>
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            variant={currentCategory === category ? "default" : "outline"}
            onClick={() => 
              window.history.pushState({}, "", `/catalog?category=${category}`)
            }
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
