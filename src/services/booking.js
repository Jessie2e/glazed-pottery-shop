/**
 * Booking integration placeholder.
 * Keep the UI independent from the vendor so Mandy can choose later.
 * Recommended production options: Shopify appointment app, Acuity, Calendly,
 * Square Appointments, or a custom Supabase-backed calendar.
 */

export async function submitBooking(payload) {
  console.info('Prototype booking payload:', payload);
  return {
    ok: true,
    reference: `GLZ-${Date.now().toString().slice(-6)}`,
  };
}
