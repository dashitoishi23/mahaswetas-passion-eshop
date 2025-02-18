import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen">
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/60">
          <div className="container mx-auto h-full flex items-center">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Handcrafted Tradition
                <br />
                <span className="text-primary">Modern Expression</span>
              </h1>
              <p className="text-lg mb-8 text-muted-foreground">
                Discover our collection of handmade traditional wear and
                sustainable recycled jewelry.
              </p>
              <Button
                size="lg"
                onClick={() => setLocation("/catalog")}
              >
                Shop Collection
              </Button>
            </div>
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1612840540220-73fa807d9896"
          alt="Traditional wear"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Dupattas",
              image: "https://images.unsplash.com/photo-1597380281502-80858032f5bd",
              description: "Traditional hand-woven dupattas"
            },
            {
              title: "Kurtis",
              image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960",
              description: "Designer kurtis with modern cuts"
            },
            {
              title: "Jewelry",
              image: "https://images.unsplash.com/photo-1737998874193-8f6da6cad870",
              description: "Sustainable recycled jewelry"
            }
          ].map((category) => (
            <div
              key={category.title}
              className="group cursor-pointer"
              onClick={() => setLocation(`/catalog?category=${category.title}`)}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                <img
                  src={category.image}
                  alt={category.title}
                  className="object-cover w-full h-full transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}