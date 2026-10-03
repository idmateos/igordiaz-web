export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center text-foreground">
      <section aria-labelledby="page-title">
        <h1
          id="page-title"
          className="text-balance text-3xl font-medium tracking-tight md:text-5xl"
        >
          Do you have a problem or a need?
        </h1>
        <p className="mt-5 text-lg text-muted-foreground md:text-xl">
          I have the solution, let me know:
        </p>
        <a
          href="mailto:solutions@igordiaz.com"
          className="mt-8 inline-block text-base underline decoration-1 underline-offset-8 transition-opacity hover:opacity-60 md:text-lg"
        >
          solutions@igordiaz.com
        </a>
      </section>
    </main>
  )
}

export const metadata = {
  title: "Solutions — Igor Díaz",
  description: "Do you have a problem or a need? Let’s talk.",
}
