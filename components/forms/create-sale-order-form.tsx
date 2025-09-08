"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api";

export function CreateSaleOrderForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await apiClient.post("/api/v1/sale-orders/create_sale_order/", {
        status,
      });

      // Show success message
      toast({
        title: "✓ Success",
        description: "Sale order has been created successfully!",
        variant: "default", // default is usually green/success style
      });

      // Reset form
      setStatus("");
    } catch (error: any) {
      // Show error message with details if available
      toast({
        title: "× Error",
        description:
          error?.message || "Failed to create sale order. Please try again.",
        variant: "destructive", // destructive is usually red/error style
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Input
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          placeholder="Enter status"
          required
        />
      </div>
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creating..." : "Create Sale Order"}
      </Button>
    </form>
  );
}
