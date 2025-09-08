"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Plus, Minus } from "lucide-react";
import { apiClient } from "@/lib/api";

interface StockExchangeItem {
  sale_order_id: string;
  quantity: string;
  brand_item_id: string;
}

export function CreateBulkStockExchangeForm() {
  const [items, setItems] = useState<StockExchangeItem[]>([
    { sale_order_id: "", quantity: "", brand_item_id: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const addItem = () => {
    setItems([
      ...items,
      { sale_order_id: "", quantity: "", brand_item_id: "" },
    ]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (
    index: number,
    field: keyof StockExchangeItem,
    value: string
  ) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = items.map((item) => ({
        sale_order_id: Number.parseInt(item.sale_order_id),
        quantity: Number.parseInt(item.quantity),
        brand_item_id: Number.parseInt(item.brand_item_id),
      }));

      await apiClient.post("/api/v1/sale-orders/stock-exchange/bulk/", data);

      // Show success message
      toast({
        title: "✓ Success",
        description: `${items.length} stock exchange item(s) have been created successfully!`,
        variant: "default", // default is usually green/success style
      });

      // Reset form
      setItems([{ sale_order_id: "", quantity: "", brand_item_id: "" }]);
    } catch (error: any) {
      // Show error message with details if available
      toast({
        title: "× Error",
        description:
          error?.message ||
          "Failed to create stock exchange items. Please check your input and try again.",
        variant: "destructive", // destructive is usually red/error style
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="space-y-2 p-4 border rounded-lg">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium">
              Stock Exchange Item {index + 1}
            </Label>
            {items.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeItem(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor={`se_sale_order_id_${index}`} className="text-xs">
                Sale Order ID
              </Label>
              <Input
                id={`se_sale_order_id_${index}`}
                type="number"
                value={item.sale_order_id}
                onChange={(e) =>
                  updateItem(index, "sale_order_id", e.target.value)
                }
                required
              />
            </div>
            <div>
              <Label htmlFor={`se_quantity_${index}`} className="text-xs">
                Quantity
              </Label>
              <Input
                id={`se_quantity_${index}`}
                type="number"
                value={item.quantity}
                onChange={(e) => updateItem(index, "quantity", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor={`se_brand_item_id_${index}`} className="text-xs">
                Brand Item ID
              </Label>
              <Input
                id={`se_brand_item_id_${index}`}
                type="number"
                value={item.brand_item_id}
                onChange={(e) =>
                  updateItem(index, "brand_item_id", e.target.value)
                }
                required
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={addItem}
          className="flex-1 bg-transparent"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
        <Button type="submit" disabled={loading} className="flex-1">
          {loading ? "Creating..." : "Create Stock Exchange Items"}
        </Button>
      </div>
    </form>
  );
}
