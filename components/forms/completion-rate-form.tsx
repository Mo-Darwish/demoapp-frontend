"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { apiClient } from "@/lib/api"

interface CompletionRateFormProps {
  onResult: (data: any) => void
}

export function CompletionRateForm({ onResult }: CompletionRateFormProps) {
  const [orderId, setOrderId] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = await apiClient.get(`/api/v2/sale-orders/${orderId}/completion-rate/`)

      onResult(data)
      toast({
        title: "Success",
        description: "Completion rate retrieved successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get completion rate",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="completion-order-id">Order ID</Label>
        <Input
          id="completion-order-id"
          type="number"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter order ID"
          required
        />
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Getting Rate..." : "Get Completion Rate"}
      </Button>
    </form>
  )
}
