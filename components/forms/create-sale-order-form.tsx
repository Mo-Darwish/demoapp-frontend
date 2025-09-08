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
      const response = await apiClient.post(
        "/api/v1/sale-orders/create_sale_order/",
        { status }
      );
      // If apiClient returns a Response object, check status. If it returns parsed JSON, check for a status property or assume success.
      if (
        response &&
        typeof response === "object" &&
        "status" in response &&
        response.status === 201
      ) {
        toast({
          title: "Success",
          description: "Sale order created successfully",
        });
        setStatus("");
      } else if (response && response.status && response.status !== 201) {
        toast({
          title: "Error",
          description: `Failed to create sale order (Status: ${response.status})`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Sale order created successfully",
        });
        setStatus("");
      }
    } catch (error: any) {
      // If error has a status property, show it
      toast({
        title: "Error",
        description: error?.message || "Failed to create sale order",
        variant: "destructive",
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
