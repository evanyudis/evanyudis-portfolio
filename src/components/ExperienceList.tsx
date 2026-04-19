export function ExperienceList() {
  const experiences = [
    {
      role: 'Sr. Product Designer',
      company: 'Kredivo',
      period: 'Oct 2025 — NOW',
      description:
        'Spearheaded the establishment of Kredivo\'s Design System, working closely with both design and engineering teams.',
    },
    {
      role: 'Sr. Product Designer',
      company: 'Tokopedia | TikTok Shop',
      period: '2024 — 2025',
      description:
        'Led After-Sales experiences, including the Resolution Center, improving post-purchase clarity and user satisfaction.',
    },
    {
      role: 'Product Designer',
      company: 'Tokopedia | TikTok Shop',
      period: '2021 — 2024',
      description:
        'Led design for core modules including Homepage, Cart, Checkout, and Promotions, improving purchase flow and reducing friction.',
    },
    {
      role: 'Product Designer',
      company: 'AdMedika by Telkom',
      period: '2020 — 2021',
      description:
        'Built and maintained design system components across multiple products; served as primary Designer-in-Charge for Telkomsehat.',
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      {experiences.map((exp, idx) => (
        <div key={idx} className="border-t border-light-gray pt-8 experience-item">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 mb-2">
            <h3 className="text-lg font-normal text-black">
              {exp.role}
            </h3>
            <p className="text-sm text-stone">{exp.period}</p>
          </div>
          <p className="text-base font-normal text-mid-gray mb-2">
            {exp.company}
          </p>
          <p className="text-base text-stone leading-relaxed">
            {exp.description}
          </p>
        </div>
      ))}
    </div>
  )
}
