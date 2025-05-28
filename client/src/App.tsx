import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ProductCatalog from "@/pages/ProductCatalog";
import Checkout from "@/pages/Checkout";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminLogin from "@/pages/admin/Login";
import ProductDetails from "@/pages/ProductDetails";
import { CartOverlay } from "@/components/CartOverlay";

function Navigation() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <nav className="flex items-center gap-6">
          <Link href="/" className="font-semibold text-lg">
            Artisan Wear
          </Link>
          <Link href="/catalog" className="text-muted-foreground hover:text-foreground">
            Shop
          </Link>
        </nav>
        <CartOverlay />
      </div>
    </header>
  );
}

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith('/admin');

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/catalog" component={ProductCatalog} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/admin/login" component={AdminLogin} />
      <Route path="/product/:id" component={ProductDetails} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
      <main>
        <Router />
      </main>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;