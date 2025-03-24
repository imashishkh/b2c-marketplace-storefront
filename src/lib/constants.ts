// Add this function to identify Razorpay payment providers
export const isRazorpay = (providerId?: string) => {
  return providerId?.startsWith("pp_razorpay")
}

// Add this function to identify Stripe payment providers
export const isStripe = (providerId?: string) => {
  return providerId?.startsWith("pp_stripe")
}

// Add this to your payment info map
export const paymentInfoMap = {
  // ... existing payment providers
  pp_razorpay_razorpay: {
    title: "Razorpay",
    icon: null, // You can replace with an appropriate icon from your icons directory
  },
} 