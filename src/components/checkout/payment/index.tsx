"use client"

import React, { useState } from "react"
import { Button } from "@/components/atoms"
import { HttpTypes } from "@medusajs/types"
import { initiatePaymentSession } from "@/lib/data/cart"
import { isRazorpay, isStripe } from "@/lib/constants"

type PaymentProps = {
  cart: HttpTypes.StoreCart
}

const Payment: React.FC<PaymentProps> = ({ cart }) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeSession, setActiveSession] = useState<boolean>(false)

  const paymentProviders = cart.payment_collection?.payment_sessions || []
  
  const handleSelectPaymentMethod = async (providerId: string) => {
    setSelectedPaymentMethod(providerId)
    
    try {
      setIsLoading(true)
      setError(null)
      
      const shouldInputCard = isStripe(selectedPaymentMethod) && !activeSession

      if (!activeSession) {
        await initiatePaymentSession(cart, {
          provider_id: selectedPaymentMethod,
          context: {
            extra: cart
          }
        })
        setActiveSession(true)
      }
    } catch (error) {
      console.error("Error initializing payment session:", error)
      setError("An error occurred while initializing the payment session.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Payment Method</h2>
      
      {error && (
        <div className="text-red-500 text-small-regular">
          {error}
        </div>
      )}
      
      <div className="space-y-2">
        {paymentProviders.map((provider) => (
          <div key={provider.provider_id} className="flex items-center space-x-2">
            <input
              type="radio"
              id={provider.provider_id}
              name="payment-method"
              value={provider.provider_id}
              checked={selectedPaymentMethod === provider.provider_id}
              onChange={() => handleSelectPaymentMethod(provider.provider_id)}
              className="h-4 w-4"
            />
            <label htmlFor={provider.provider_id} className="flex-grow">
              {provider.provider_id}
            </label>
          </div>
        ))}
      </div>
      
      {isLoading && (
        <div className="flex justify-center">
          <div className="animate-spin h-6 w-6 border-2 border-primary rounded-full border-t-transparent"></div>
        </div>
      )}
    </div>
  )
}

export default Payment 