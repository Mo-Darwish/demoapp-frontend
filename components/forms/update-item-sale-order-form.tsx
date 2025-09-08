"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api"

export function UpdateItemSaleOrderForm() {
  const [saleOrderId, setSaleOrderId] = useState("")
  const [brandItemId, setBrandItemId] = useState("")
  const [quantity, setQuantity] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await apiClient.patch("/api/v1/sale-order-items/item_sale_order/", {
        sale_order_id: Number.parseInt(saleOrderId),
        brand_item_id: Number.parseInt(brandItemId),
        quantity: Number.parseInt(quantity),
      })

      toast({
        title: "Success",
        description: "Item sale order updated successfully",
      })
      setSaleOrderId("")
      setBrandItemId("")
      setQuantity("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update item sale order",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="update-item-sale-order-id">Sale Order ID</Label>
        <Input
          id="update-item-sale-order-id"
          type="number"
          value={saleOrderId}
          onChange={(e) => setSaleOrderId(e.target.value)}
          placeholder="Enter sale order ID"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="update-item-brand-id">Brand Item ID</Label>
        <Input
          id="update-item-brand-id"
          type="number"
          value={brandItemId}
          onChange={(e) => setBrandItemId(e.target.value)}
          placeholder="Enter brand item ID"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="update-item-quantity">Quantity</Label>
        <Input
          id="update-item-quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter new quantity"
          required
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Updating..." : "Update Item Sale Order"}
      </Button>
    </form>
  )
}
