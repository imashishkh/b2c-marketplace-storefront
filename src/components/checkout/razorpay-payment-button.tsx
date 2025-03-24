"use client"

import { Button } from "@medusajs/ui"
import Spinner from "@/components/icons/spinner"
import React, { useCallback, useEffect, useState } from "react"
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay"
import { HttpTypes } from "@medusajs/types"
import { sdk as medusaClient } from "@/lib/config"
import { CurrencyCode } from "react-razorpay/dist/constants/currency"

export const RazorpayPaymentButton = ({
  session,
  notReady,
  cart
}: {
  session: HttpTypes.StorePaymentSession
  notReady: boolean
  cart: HttpTypes.StoreCart
}) => {
  const [disabled, setDisabled] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)
  const { Razorpay } = useRazorpay()

  const [orderData, setOrderData] = useState({id:""})

  const onPaymentCompleted = async () => {
    setSubmitting(true)
    try {
      
      const data = await medusaClient.store.cart.complete(cart.id)
      
      // Update how we check for a successful order
      if (data.type === "order" && data.order) {
        // Payment and order were successful - redirect to success page
        window.location.href = `/order/confirmed/${data.order.id}`
      } else {
        // Something went wrong
        setErrorMessage("An error occurred while processing your payment. Please try again.")
        console.error(data.type === "cart" ? (data as any).error : "Unknown error")
      }
    } catch (error) {
      console.error("Error completing order:", error)
      setErrorMessage("An error occurred, please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    setOrderData(session.data as {id:string})
  }, [session.data])

  const handlePayment = useCallback(() => {
    setSubmitting(true)
    
    const options: RazorpayOrderOptions = {
      callback_url: `${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/razorpay/hooks`,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY ?? '',
      amount: session.amount*100*100, // Note the amount calculation: multiplying by 100 twice
      order_id: orderData.id,
      currency: cart.currency_code.toUpperCase() as CurrencyCode,
      name: process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Your Marketplace",
      description: `Order for ${cart.id}`,
      remember_customer: true,
      modal: {
        backdropclose: true,
        escape: true,
        handleback: true,
        confirm_close: true,
        ondismiss: () => {
          setSubmitting(false)
        },
        animation: true,
      },
      handler: async () => {
        onPaymentCompleted()
      },
      prefill: {
        name: cart?.billing_address?.first_name + " " + cart?.billing_address?.last_name,
        email: cart?.email,
        contact: (cart?.shipping_address?.phone) ?? undefined
      }
    }

    if (orderData.id) {
      const razorpay = new Razorpay(options)
      razorpay.open()
      
      razorpay.on("payment.failed", function (response: any) {
        setErrorMessage(JSON.stringify(response.error))
        setSubmitting(false)
      })
      
      razorpay.on("payment.authorized" as any, function () {
        // Payment is authorized but not yet captured
      })
      
      razorpay.on("payment.captured" as any, function () {
        // Payment has been captured
      })
    } else {
      setErrorMessage("Order data not available")
      setSubmitting(false)
    }
  }, [Razorpay, cart, orderData.id, session.amount])

  return (
    <>
      <Button
        disabled={submitting || notReady || !orderData?.id || orderData.id === ''}
        onClick={handlePayment}
        className="w-full"
      >
        {submitting ? <Spinner /> : "Pay with Razorpay"}
      </Button>
      {errorMessage && (
        <div className="text-red-500 text-small-regular mt-2">
          {errorMessage}
        </div>
      )}
    </>
  )
}

export default RazorpayPaymentButton