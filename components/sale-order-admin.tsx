"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateSaleOrderForm } from "./forms/create-sale-order-form"
import { CreateBulkItemsForm } from "./forms/create-bulk-items-form"
import { CreateBulkStockExchangeForm } from "./forms/create-bulk-stock-exchange-form"
import { DataTable } from "./data-table"
import { Button } from "@/components/ui/button"
import { DeleteSaleOrderForm } from "./forms/delete-sale-order-form"
import { DeleteItemSaleOrderForm } from "./forms/delete-item-sale-order-form"
import { DeleteStockExchangeForm } from "./forms/delete-stock-exchange-form"
import { UpdateItemSaleOrderForm } from "./forms/update-item-sale-order-form"
import { UpdateStockExchangeForm } from "./forms/update-stock-exchange-form"
import { CompletionRateForm } from "./forms/completion-rate-form"
import { Package, ShoppingCart, BarChart3, Trash2, Edit } from "lucide-react"
import { apiClient } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"

export function SaleOrderAdmin() {
  const [saleOrders, setSaleOrders] = useState([])
  const [bulkItems, setBulkItems] = useState([])
  const [stockExchangeItems, setStockExchangeItems] = useState([])
  const [completionRates, setCompletionRates] = useState([])
  const [specificCompletionRate, setSpecificCompletionRate] = useState(null)
  const [loading, setLoading] = useState({
    saleOrders: false,
    bulkItems: false,
    stockExchange: false,
    completionRates: false,
  })

  const { toast } = useToast()

  const fetchSaleOrders = async () => {
    setLoading((prev) => ({ ...prev, saleOrders: true }))
    try {
      const data = await apiClient.get("/api/v1/sale-orders/sale_orders/")
      setSaleOrders(data)
      toast({
        title: "Success",
        description: "Sale orders loaded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to fetch sale orders: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setLoading((prev) => ({ ...prev, saleOrders: false }))
    }
  }

  const fetchBulkItems = async () => {
    setLoading((prev) => ({ ...prev, bulkItems: true }))
    try {
      const data = await apiClient.get("/api/v1/sale-orders/items/")
      setBulkItems(data)
      toast({
        title: "Success",
        description: "Bulk items loaded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to fetch bulk items: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setLoading((prev) => ({ ...prev, bulkItems: false }))
    }
  }

  const fetchStockExchangeItems = async () => {
    setLoading((prev) => ({ ...prev, stockExchange: true }))
    try {
      const data = await apiClient.get("/api/v1/sale-orders/stock-exchange/")
      setStockExchangeItems(data)
      toast({
        title: "Success",
        description: "Stock exchange items loaded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to fetch stock exchange items: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setLoading((prev) => ({ ...prev, stockExchange: false }))
    }
  }

  const fetchCompletionRates = async () => {
    setLoading((prev) => ({ ...prev, completionRates: true }))
    try {
      const data = await apiClient.get("/api/v2/sale-orders/completion-rates/")
      setCompletionRates(data)
      toast({
        title: "Success",
        description: "Completion rates loaded successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to fetch completion rates: ${error instanceof Error ? error.message : "Unknown error"}`,
        variant: "destructive",
      })
    } finally {
      setLoading((prev) => ({ ...prev, completionRates: false }))
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-balance">Sale Order Management</h1>
        <p className="text-muted-foreground text-lg">Comprehensive admin panel for managing e-commerce sale orders</p>
      </div>

      <Tabs defaultValue="create" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Create
          </TabsTrigger>
          <TabsTrigger value="read" className="flex items-center gap-2">
            <ShoppingCart className="h-4 w-4" />
            View Data
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="update" className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Update
          </TabsTrigger>
          <TabsTrigger value="delete" className="flex items-center gap-2">
            <Trash2 className="h-4 w-4" />
            Delete
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Create Sale Order</CardTitle>
                <CardDescription>Create a new sale order with status</CardDescription>
              </CardHeader>
              <CardContent>
                <CreateSaleOrderForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create Bulk Items</CardTitle>
                <CardDescription>Add multiple items to sale orders</CardDescription>
              </CardHeader>
              <CardContent>
                <CreateBulkItemsForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Create Bulk Stock Exchange</CardTitle>
                <CardDescription>Add stock exchange items in bulk</CardDescription>
              </CardHeader>
              <CardContent>
                <CreateBulkStockExchangeForm />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="read" className="space-y-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Sale Orders</CardTitle>
                  <CardDescription>View all sale orders</CardDescription>
                </div>
                <Button onClick={fetchSaleOrders} disabled={loading.saleOrders}>
                  {loading.saleOrders ? "Loading..." : "Refresh Data"}
                </Button>
              </CardHeader>
              <CardContent>
                <DataTable data={saleOrders} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Bulk Items</CardTitle>
                  <CardDescription>View all bulk items</CardDescription>
                </div>
                <Button onClick={fetchBulkItems} disabled={loading.bulkItems}>
                  {loading.bulkItems ? "Loading..." : "Refresh Data"}
                </Button>
              </CardHeader>
              <CardContent>
                <DataTable data={bulkItems} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Stock Exchange Items</CardTitle>
                  <CardDescription>View all stock exchange items</CardDescription>
                </div>
                <Button onClick={fetchStockExchangeItems} disabled={loading.stockExchange}>
                  {loading.stockExchange ? "Loading..." : "Refresh Data"}
                </Button>
              </CardHeader>
              <CardContent>
                <DataTable data={stockExchangeItems} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>All Completion Rates</CardTitle>
                  <CardDescription>View completion rates for all orders</CardDescription>
                </div>
                <Button onClick={fetchCompletionRates} disabled={loading.completionRates}>
                  {loading.completionRates ? "Loading..." : "Get Rates"}
                </Button>
              </CardHeader>
              <CardContent>
                <DataTable data={completionRates} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specific Order Completion Rate</CardTitle>
                <CardDescription>Get completion rate for a specific order</CardDescription>
              </CardHeader>
              <CardContent>
                <CompletionRateForm onResult={setSpecificCompletionRate} />
                {specificCompletionRate && (
                  <div className="mt-4">
                    <DataTable data={[specificCompletionRate]} />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="update" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Update Item Sale Order</CardTitle>
                <CardDescription>Update quantity for item sale orders</CardDescription>
              </CardHeader>
              <CardContent>
                <UpdateItemSaleOrderForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Update Stock Exchange Order</CardTitle>
                <CardDescription>Update quantity for stock exchange orders</CardDescription>
              </CardHeader>
              <CardContent>
                <UpdateStockExchangeForm />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="delete" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Delete Sale Order</CardTitle>
                <CardDescription>Remove a sale order completely</CardDescription>
              </CardHeader>
              <CardContent>
                <DeleteSaleOrderForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delete Item Sale Order</CardTitle>
                <CardDescription>Remove specific item from sale order</CardDescription>
              </CardHeader>
              <CardContent>
                <DeleteItemSaleOrderForm />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delete Stock Exchange Order</CardTitle>
                <CardDescription>Remove stock exchange item</CardDescription>
              </CardHeader>
              <CardContent>
                <DeleteStockExchangeForm />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
