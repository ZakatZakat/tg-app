import { client } from "./client"

export type PopularRoute = { origin: string; destination: string; count?: number }
export type RecentQuery = { from?: string; to?: string; created_at?: string }

export const getPopularRoutes = () => client.flights.popularRoutes()
export const getRecentQueries = () => client.flights.recentQueries()

