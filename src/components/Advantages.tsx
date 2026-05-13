import { useEffect, useRef, useState } from "react"

const advantages = [
  {
    number: "01",
    title: "8 лет опыта",
    description: "Более восьми лет работы с коммерческой недвижимостью — офисами и стрит-ритейлом. Знаем рынок изнутри и умеем находить решения там, где другие останавливаются.",
  },
  {
    number: "02",
    title: "Индивидуальный подход",
    description: "Каждый объект и каждый клиент уникальны. Мы не работаем по шаблонам — выстраиваем стратегию под конкретные задачи и цели собственника.",
  },
  {
    number: "03",
    title: "Полное сопровождение",
    description: "Берём на себя весь цикл: от поиска арендатора до юридического оформления и контроля исполнения договора. Вы получаете результат, а не процесс.",
  },
  {
    number: "04",
    title: "Прозрачность на каждом шаге",
    description: "Регулярная отчётность, открытая коммуникация и честные условия сотрудничества. Никаких скрытых комиссий и неожиданных сюрпризов.",
  },
]

export function Advantages() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-32 lg:py-40 px-6 lg:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
            <div
              className={`transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <span className="text-xs tracking-[0.2em] uppercase text-terracotta mb-6 block">Почему re-com</span>
              <h2 className="font-serif text-4xl lg:text-5xl text-foreground leading-tight">
                Наши преимущества
              </h2>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-0">
            {advantages.map((item, i) => (
              <div
                key={item.number}
                className={`group border-t border-border py-10 transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${200 + i * 150}ms` }}
              >
                <div className="flex gap-8 items-start">
                  <span className="text-xs text-stone-400 mt-1 w-6 shrink-0">{item.number}</span>
                  <div>
                    <h3 className="font-serif text-2xl text-foreground mb-3 group-hover:text-terracotta transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-border" />
          </div>
        </div>
      </div>
    </section>
  )
}
