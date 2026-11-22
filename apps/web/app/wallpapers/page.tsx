"use client"

import { Suspense, useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WallpapersGrid } from "./WallpapersGrid"
import { useLanguage } from "@/context/LanguageContext"

const WALLPAPERS_JSON_URL =
  "https://raw.githubusercontent.com/CAPlayground/wallpapers/refs/heads/main/wallpapers.json"

interface WallpaperItem {
  id: string | number
  name: string
  creator: string
  description: string
  file: string
  preview: string
  date: number
  from: string
}

interface WallpapersResponse {
  base_url: string
  wallpapers: WallpaperItem[]
}

export default function WallpapersPage() {
  const { t } = useLanguage()
  const [data, setData] = useState<WallpapersResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetch(WALLPAPERS_JSON_URL, { headers: { Accept: "application/json" } })
      .then((res) => (res.ok ? res.json() : null))
      .then((json: WallpapersResponse | null) => {
        if (active && json && Array.isArray(json.wallpapers) && typeof json.base_url === "string") {
          setData(json)
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative">
        <Navigation />

        <main className="relative">
          <section className="pt-16 md:pt-24 pb-8 md:pb-12">
            <div className="container mx-auto px-3 min-[600px]:px-4 lg:px-6">
              <div className="max-w-5xl mx-auto text-center mb-8 md:mb-10">
                <h1 className="font-heading text-5xl md:text-[50px] font-bold">{t("wallpapers.title")}</h1>
                <p className="text-muted-foreground mt-3">
                  {t("wallpapers.subtitle")}
                </p>
              </div>

              {loading && (
                <div className="max-w-xl mx-auto text-center text-sm text-muted-foreground">
                  {t("wallpapers.loading")}
                </div>
              )}

              {!loading && !data && (
                <div className="max-w-xl mx-auto text-center text-sm text-muted-foreground">
                  {t("wallpapers.error")}
                </div>
              )}

              {data && (
                <Suspense fallback={<div className="text-center text-muted-foreground">{t("wallpapers.loading")}</div>}>
                  <WallpapersGrid data={data} />
                </Suspense>
              )}
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </div>
  )
}
