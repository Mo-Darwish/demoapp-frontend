"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle } from "lucide-react"
import { apiClient } from "@/lib/api"

export function DeleteItemSaleOrderForm() {
  const [saleOrderId, setSaleOrderId] = useState("")
  const [brandItemId, setBrandItemId] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await apiClient.delete("/api/v1/sale-order-items/item_sale_order/", {
        body: JSON.stringify({
          sale_order_id: Number.parseInt(saleOrderId),
          brand_item_id: Number.parseInt(brandItemId),
        }),
      })

      toast({
        title: "Success",
        description: "Item sale order deleted successfully",
      })
      setSaleOrderId("")
      setBrandItemId("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item sale order",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center gap-2 p-3 bg-destructive/10 rounded-lg">
        <AlertTriangle className="h-4 w-4 text-destructive" />
        <span className="text-sm text-destructive">This action cannot be undone</span>
      </div>

      <div className="space-y-2">
        <Label htmlFor="delete-item-sale-order-id">Sale Order ID</Label>
        <Input
          id="delete-item-sale-order-id"
          type="number"
          value={saleOrderId}
          onChange={(e) => setSaleOrderId(e.target.value)}
          placeholder="Enter sale order ID"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="delete-item-brand-id">Brand Item ID</Label>
        <Input
          id="delete-item-brand-id"
          type="number"
          value={brandItemId}
          onChange={(e) => setBrandItemId(e.target.value)}
          placeholder="Enter brand item ID"
          required
        />
      </div>

      <Button type="submit" disabled={loading} variant="destructive" className="w-full">
        {loading ? "Deleting..." : "Delete Item Sale Order"}
      </Button>
    </form>
  )
}
