import { useEffect, useRef, useState } from "react"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { Contact } from "@/components/Contact"

const services = [
  {
    id: "management",
    label: "01 — Управление",
    title: "Управление коммерческой недвижимостью",
    description:
      "Берём на себя полную операционную нагрузку — от поиска арендаторов до технической эксплуатации. Вы получаете стабильный доход без ежедневных забот об объекте.",
    items: [
      {
        title: "Офисная недвижимость",
        description:
          "Полное управление офисными зданиями и бизнес-центрами: поиск арендаторов, ведение договоров, техническое обслуживание и клининг.",
      },
      {
        title: "Стрит ритейл",
        description:
          "Управление торговыми помещениями на первых этажах: подбор концептуальных арендаторов, работа с трафиком, контроль соблюдения условий.",
      },
      {
        title: "Финансовое управление",
        description:
          "Прозрачная ежемесячная отчётность, своевременный сбор арендных платежей, бюджетирование и контроль расходов на эксплуатацию.",
      },
      {
        title: "Техническая эксплуатация",
        description:
          "Плановое и аварийное обслуживание инженерных систем, контроль подрядчиков, повышение класса объекта для привлечения арендаторов более высокого уровня и увеличения ставки.",
      },
    ],
  },
  {
    id: "acquisition",
    label: "02 — Покупка",
    title: "Помощь в покупке объекта",
    description:
      "Помогаем найти и приобрести коммерческую недвижимость, которая будет работать на вас. Знаем рынок изнутри — видим объекты до их появления в открытых источниках.",
    items: [
      {
        title: "Подбор объекта",
        description:
          "Анализируем ваши цели и бюджет, формируем критерии поиска и находим объекты с реальным потенциалом доходности.",
      },
      {
        title: "Проверка и оценка",
        description:
          "Проводим юридическую проверку, техническую экспертизу и оцениваем рыночную стоимость — защищаем от скрытых рисков.",
      },
      {
        title: "Переговоры и сделка",
        description:
          "Ведём переговоры с продавцом, сопровождаем сделку от предварительного договора до регистрации права собственности.",
      },
      {
        title: "Стратегия после покупки",
        description:
          "Сразу после сделки разрабатываем план управления объектом — чтобы он начал приносить доход как можно быстрее.",
      },
    ],
  },
  {
    id: "renovation",
    label: "03 — Ремонт",
    title: "Ремонт и реконструкция",
    description:
      "Готовим объект к сдаче в аренду или повышаем его класс для привлечения качественных арендаторов. Контролируем подрядчиков, сроки и бюджет.",
    items: [
      {
        title: "Концепция и проект",
        description:
          "Разрабатываем техническое задание и дизайн-концепцию с учётом целевого арендатора и рыночных требований к объекту.",
      },
      {
        title: "Подбор подрядчиков",
        description:
          "Выбираем проверенных подрядчиков, проводим тендер и заключаем договоры с фиксированными сроками и ценой.",
      },
      {
        title: "Контроль строительства",
        description:
          "Ведём строительный контроль на каждом этапе: качество работ, соблюдение сроков, расход материалов и бюджет.",
      },
      {
        title: "Сдача и запуск",
        description:
          "Принимаем объект у подрядчика, устраняем замечания и сразу передаём в управление — без простоя после ремонта.",
      },
    ],
  },
]

function ServiceBlock({
  service,
  index,
}: {
  service: (typeof services)[0]
  index: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 },
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const isEven = index % 2 === 0

  return (
    <div
      ref={sectionRef}
      id={service.id}
      className={`py-32 lg:py-40 px-6 lg:px-12 ${isEven ? "" : "bg-sand/50"}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p
            className={`text-xs tracking-[0.3em] uppercase text-terracotta mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {service.label}
          </p>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-24">
            <h2
              className={`font-serif text-4xl md:text-5xl lg:text-6xl font-light text-foreground text-balance transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {service.title}
            </h2>
            <p
              className={`text-muted-foreground leading-relaxed lg:pt-4 transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {service.description}
            </p>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 gap-px bg-border">
          {service.items.map((item, i) => (
            <div
              key={item.title}
              className={`group bg-background p-10 lg:p-14 transition-all duration-1000 hover:bg-card ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${400 + i * 150}ms` }}
            >
              <p className="text-xs tracking-[0.2em] uppercase text-sage mb-4">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end px-6 lg:px-12 pb-20 pt-40 bg-gradient-to-b from-sand/40 to-background">
        <div className="max-w-7xl mx-auto w-full">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">Услуги</p>
          <h1 className="font-serif text-5xl md:text-7xl font-light leading-[1.1] text-foreground mb-8">
            Комплексная работа
            <span className="block text-sage">с недвижимостью</span>
          </h1>
          <nav className="flex flex-wrap gap-8 mt-12 pt-12 border-t border-border">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-sm tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {services.map((service, index) => (
        <ServiceBlock key={service.id} service={service} index={index} />
      ))}

      <Contact />
      <Footer />
    </main>
  )
}