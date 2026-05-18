import type React from "react"
import { useEffect, useRef, useState } from "react"
import func2url from "../../backend/func2url.json"
import { QRCodeSVG } from "qrcode.react"

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", message: "" })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch(func2url["send-contact"], {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
      setFormState({ name: "", email: "", phone: "", message: "" })
    } catch {
      setStatus("error")
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="py-32 lg:py-40 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div>
            <p
              className={`text-xs tracking-[0.3em] uppercase text-terracotta mb-6 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Контакты
            </p>
            <h2
              className={`font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground mb-8 text-balance transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Обсудим ваш объект?
            </h2>
            <p
              className={`text-muted-foreground leading-relaxed mb-12 max-w-md transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              Расскажите об объекте — офис, торговое помещение или смешанный формат. Проведём бесплатный анализ и предложим стратегию управления.
            </p>

            <div
              className={`space-y-6 transition-all duration-1000 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Телефон</p>
                <a href="tel:+79588324242" className="text-foreground hover:text-sage transition-colors">
                  +7 (958) 832-42-42
                </a>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">WhatsApp</p>
                <a
                  href="https://wa.me/79588324242"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground hover:text-sage transition-colors"
                >
                  Написать в WhatsApp
                </a>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Почта</p>
                <a href="mailto:info@re-com.site" className="text-foreground hover:text-sage transition-colors">
                  info@re-com.site
                </a>
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Локация</p>
                <p className="text-foreground">Москва</p>
              </div>
              <div className="pt-4">
                <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Написать в WhatsApp</p>
                <div className="inline-block p-3 bg-white rounded-lg">
                  <QRCodeSVG
                    value="https://wa.me/79588324242"
                    size={120}
                    bgColor="#ffffff"
                    fgColor="#1a1a1a"
                    level="M"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Наведите камеру телефона</p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {status === "success" ? (
              <div className="flex flex-col justify-center h-full py-12">
                <p className="text-xs tracking-[0.3em] uppercase text-sage mb-4">Заявка отправлена</p>
                <p className="font-serif text-3xl font-light text-foreground mb-4">Спасибо, {formState.name || ""}!</p>
                <p className="text-muted-foreground leading-relaxed">
                  Мы получили вашу заявку и свяжемся в ближайшее время.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-8 text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors self-start"
                >
                  Отправить ещё
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-xs tracking-widest uppercase text-muted-foreground mb-3">
                    Имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-sage focus:outline-none transition-colors"
                    placeholder="Ваше имя"
                    required
                    disabled={status === "loading"}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs tracking-widest uppercase text-muted-foreground mb-3">
                    Почта
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-sage focus:outline-none transition-colors"
                    placeholder="ваш@email.com"
                    required
                    disabled={status === "loading"}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs tracking-widest uppercase text-muted-foreground mb-3">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-sage focus:outline-none transition-colors"
                    placeholder="+7 (___) ___-__-__"
                    disabled={status === "loading"}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs tracking-widest uppercase text-muted-foreground mb-3">
                    Об объекте
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    rows={4}
                    className="w-full bg-transparent border-b border-border py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-sage focus:outline-none transition-colors resize-none"
                    placeholder="Тип объекта, площадь, текущая ситуация..."
                    required
                    disabled={status === "loading"}
                  />
                </div>

                {status === "error" && (
                  <p className="text-terracotta text-sm">
                    Не удалось отправить заявку. Попробуйте ещё раз или напишите напрямую на почту.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-sage text-primary-foreground text-sm tracking-widest uppercase hover:bg-sage/90 transition-all duration-500 disabled:opacity-60"
                >
                  {status === "loading" ? "Отправляем..." : "Отправить заявку"}
                  {status !== "loading" && (
                    <svg
                      className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}