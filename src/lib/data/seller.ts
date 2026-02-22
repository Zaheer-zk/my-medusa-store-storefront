"use server"

import { sdk } from "@lib/config"

export type SellerRegisterActionState =
  | {
      ok: true
      message: string
      seller_id?: string
      seller_handle?: string
    }
  | {
      ok: false
      message: string
    }
  | null

const readString = (value: FormDataEntryValue | null): string =>
  typeof value === "string" ? value.trim() : ""

export async function registerSeller(
  _currentState: SellerRegisterActionState,
  formData: FormData
): Promise<SellerRegisterActionState> {
  const payload = {
    first_name: readString(formData.get("first_name")),
    last_name: readString(formData.get("last_name")),
    email: readString(formData.get("email")),
    phone: readString(formData.get("phone")),
    password: readString(formData.get("password")),
    seller_name: readString(formData.get("seller_name")),
    seller_handle: readString(formData.get("seller_handle")),
  }

  if (
    !payload.email ||
    !payload.password ||
    !payload.seller_name ||
    !payload.seller_handle
  ) {
    return {
      ok: false,
      message:
        "Email, password, seller name, and seller handle are required.",
    }
  }

  try {
    const response = await sdk.client.fetch<{
      message?: string
      seller?: { id?: string; handle?: string }
    }>("/auth/user/emailpass/register-seller", {
      method: "POST",
      body: payload as any,
      cache: "no-store",
    } as any)

    return {
      ok: true,
      message:
        response?.message ||
        "Seller registration submitted. Awaiting super admin approval.",
      seller_id: response?.seller?.id,
      seller_handle: response?.seller?.handle,
    }
  } catch (error: any) {
    const message =
      error?.message ||
      error?.toString?.() ||
      "Failed to submit seller registration."

    return {
      ok: false,
      message,
    }
  }
}
