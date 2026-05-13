export function Footer() {
  return (
    <footer className="py-16 px-6 lg:px-12 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12">
          {/* Logo & Tagline */}
          <div className="md:col-span-4">
            <div className="flex flex-col leading-none mb-4">
              <span className="font-serif text-2xl tracking-wide text-foreground">re<span className="text-terracotta">-</span>com</span>
              <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground mt-0.5">Reliable Commercial Property</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Профессиональное управление офисами и стрит ритейлом.
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-2 md:col-start-7">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Навигация</p>
            <nav className="flex flex-col gap-3">
              <a href="/#philosophy" className="text-sm text-foreground hover:text-sage transition-colors">
                О нас
              </a>
              <a href="/services" className="text-sm text-foreground hover:text-sage transition-colors">
                Услуги
              </a>
              <a href="/#process" className="text-sm text-foreground hover:text-sage transition-colors">
                Как мы работаем
              </a>
              <a href="/#contact" className="text-sm text-foreground hover:text-sage transition-colors">
                Контакты
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <p className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Документы</p>
            <nav className="flex flex-col gap-3">
              <a href="#" className="text-sm text-foreground hover:text-sage transition-colors">
                Политика
              </a>
              <a href="#" className="text-sm text-foreground hover:text-sage transition-colors">
                Условия
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} re-com. Все права защищены.
          </p>
          <p className="text-xs text-muted-foreground">Управляем с вниманием к деталям</p>
        </div>
      </div>
    </footer>
  )
}