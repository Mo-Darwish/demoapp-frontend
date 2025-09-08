"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { AlertTriangle } from "lucide-react"
import { apiClient } from "@/lib/api"

export function DeleteSaleOrderForm() {
  const [saleOrderId, setSaleOrderId] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await apiClient.delete(`/api/v1/sale-orders/${saleOrderId}/stock-exchange/`)

      toast({
        title: "Success",
        description: "Sale order deleted successfully",
      })
      setSaleOrderId("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete sale order",
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
        <Label htmlFor="delete-sale-order-id">Sale Order ID</Label>
        <Input
          id="delete-sale-order-id"
          type="number"
          value={saleOrderId}
          onChange={(e) => setSaleOrderId(e.target.value)}
          placeholder="Enter sale order ID"
          required
        />
      </div>

      <Button type="submit" disabled={loading} variant="destructive" className="w-full">
        {loading ? "Deleting..." : "Delete Sale Order"}
      </Button>
    </form>
  )
}
