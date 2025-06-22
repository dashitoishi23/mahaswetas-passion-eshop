import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, type Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CategoryData } from "server/routes";

export default function ProductCatalog() {
  const [category, setCategory] = useState(window.location.search.split('=')[1] || 'all');

  const { data: categories } = useQuery<CategoryData[]>({
    queryKey: ["/api/categories"],
  });

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", category],
    // If category is 'all', fetch all products, otherwise fetch products by category
    queryFn: async () => {
      const response = await fetch(`/api/products${category === 'all' ? '' : `/category/${category}`}`);
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    }
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
          variant={category === 'all' ? "default" : "outline"}
          onClick={() => setCategory('all')}
        >
          All
        </Button>
        {categories.map((catalogCategory) => (
          <Button
            key={catalogCategory.name}
            variant={category === catalogCategory.name ? "default" : "outline"}
            onClick={() => setCategory(catalogCategory.name)}
          >
            {catalogCategory.name}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {
          products?.length! > 0 ? products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          )) : (            
            <div className="col-span-1 md:col-span-3 lg:col-span-4 text-center text-muted-foreground">
              <p>No products found. Check back later</p>
            </div>
          )
        }
      </div>
    </div>
  );
}
