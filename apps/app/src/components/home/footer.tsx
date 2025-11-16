import React from "react";

export default async function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="container mx-auto px-4 py-10 text-sm md:px-6">
        <div className="grid items-start gap-4 md:grid-cols-6">
          <div className="space-y-3 col-span-3">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground grid size-7 place-items-center  font-bold">
                C
              </div>
              <span className="font-medium">Clio</span>
            </div>
            <p className="text-muted-foreground">
              Contextual Medical Memory. Secure, structured, shareable.
            </p>
          </div>
        </div>
        <div className="text-muted-foreground mt-8">
          © {new Date().getFullYear()} Clio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
