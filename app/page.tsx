import { Header } from "@/components/header";
import { Suspense } from "react";
import { ProductList } from "@/components/product-list";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList />
        </Suspense>
      </main>
    </div>
  );
}