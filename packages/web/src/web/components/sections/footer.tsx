export function Footer() {
  return (
    <footer className="relative hairline-t py-14">
      <div className="mx-auto max-w-[1400px] px-[6vw] flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <img src="/images/logomark-icon.png" alt="PixelPerfect" className="h-8 w-8 object-contain" />
          <div>
            <p className="font-display text-sm text-ivory tracking-[0.06em]">
              Pixel<span className="text-gold">Perfect</span>
            </p>
            <p className="text-[0.62rem] uppercase tracking-[0.2em] text-muted-text">Educational Decks &amp; Branding</p>
          </div>
        </div>

        <p className="text-[0.7rem] text-muted-text text-center">
          &copy; {new Date().getFullYear()} PixelPerfect. Founded by Kerollos Mikhaeel. All rights reserved.
        </p>

        <a href="#top" data-cursor="link" className="text-[0.65rem] uppercase tracking-[0.25em] text-muted-text hover:text-gold transition-colors">
          Back to Top ↑
        </a>
      </div>
    </footer>
  );
}
