type Props = {
  eyebrow?: React.ReactNode
  title: string
  description?: string
  align?: 'center' | 'left'
  light?: boolean
  eyebrowStyle?: React.CSSProperties
}

export default function SectionHeading({ eyebrow, title, description, align = 'center', light = false, eyebrowStyle }: Props) {
  return (
    <div style={{ maxWidth: '42rem', marginInline: align === 'center' ? 'auto' : undefined, textAlign: align }}>
      {eyebrow && <span className="section-eyebrow" style={eyebrowStyle}>{eyebrow}</span>}
      <h2 className="section-title" style={{ color: light ? 'var(--primary-fg)' : 'var(--fg)' }}>{title}</h2>
      {description && (
        <p className="section-desc" style={{ color: light ? 'rgba(255,255,255,.8)' : 'var(--muted-fg)', marginInline: align === 'center' ? 'auto' : undefined }}>
          {description}
        </p>
      )}
    </div>
  )
}
