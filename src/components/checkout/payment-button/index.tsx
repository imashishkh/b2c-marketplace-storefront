"use client"

import { Button } from "@/components/atoms"
import { HttpTypes } from "@medusajs/types"
import React from "react"
import RazorpayPaymentButton from "@/components/checkout/razorpay-payment-button"
import { isRazorpay } from "@/lib/constants"

type PaymentButtonProps = {
  cart: HttpTypes.StoreCart
  "data-testid"?: string
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  cart,
  "data-testid": dataTestId,
}) => {
  const notReady =
    !cart ||
    !cart.shipping_address ||
    !cart.billing_address ||
    !cart.email ||
    (cart.shipping_methods?.length ?? 0) < 1

  const paymentSession = cart.payment_collection?.payment_sessions?.[0]

  if (!paymentSession) {
    return <Button disabled>No payment method available</Button>
  }

  if (isRazorpay(paymentSession.provider_id)) {
    return <RazorpayPaymentButton 
      session={paymentSession} 
      notReady={notReady} 
      cart={cart} 
    />
  }

  // Handle other payment methods here
  // Example: Stripe, PayPal, etc.

  return <Button disabled>Select a payment method</Button>
}

export default PaymentButton 