// Seeding is a development-only operation. Never expose a mutating public GET route.
export async function GET() {
  return Response.json({ error: "Not found" }, { status: 404 });
}
