import { useState, type FC } from 'react'
import StatusBar from '../components/StatusBar'

interface Line {
  text: string
  font: string
  size: number
  alignment: 'Left' | 'Center' | 'Right'
}

const DEFAULT_HEADER: Line = {
  text: 'Welcome to Our Restaurant!',
  font: 'Helvetica-Bold',
  size: 18,
  alignment: 'Center',
}
const DEFAULT_FOOTER: Line = {
  text: 'Thank you for visiting us!',
  font: 'Helvetica-Bold',
  size: 18,
  alignment: 'Center',
}

interface Props {
  onBack: () => void
}

type Section = 'header' | 'footer'

interface EditorState {
  section: Section
  index: number | null
}

const SIZE_OPTIONS = Array.from({ length: 31 }, (_, i) => 12 + i * 2)
const ALIGNMENT_OPTIONS: Line['alignment'][] = ['Left', 'Center', 'Right']

const HeaderFooterLines: FC<Props> = ({ onBack }) => {
  const [headerLines, setHeaderLines] = useState<Line[]>([DEFAULT_HEADER])
  const [footerLines, setFooterLines] = useState<Line[]>([DEFAULT_FOOTER])
  const [editor, setEditor] = useState<EditorState | null>(null)
  const [draftText, setDraftText] = useState('')
  const [draftFont, setDraftFont] = useState('Helvetica-Bold')
  const [draftSize, setDraftSize] = useState(12)
  const [draftAlignment, setDraftAlignment] = useState<Line['alignment']>('Left')

  const hasDone = draftText.trim().length > 0

  function openAddEditor(section: Section) {
    setEditor({ section, index: null })
    setDraftText('')
    setDraftFont('Helvetica-Bold')
    setDraftSize(12)
    setDraftAlignment('Left')
  }

  function openEditEditor(section: Section, index: number, line: Line) {
    setEditor({ section, index })
    setDraftText(line.text)
    setDraftFont(line.font)
    setDraftSize(line.size)
    setDraftAlignment(line.alignment)
  }

  function resetEditor() {
    setEditor(null)
    setDraftText('')
    setDraftFont('Helvetica-Bold')
    setDraftSize(12)
    setDraftAlignment('Left')
  }

  function handleDone() {
    if (!editor || !hasDone) return

    const nextLine: Line = {
      text: draftText.trim(),
      font: draftFont,
      size: draftSize,
      alignment: draftAlignment,
    }

    const applyUpdate = (prev: Line[]) => {
      if (editor.index === null) return [...prev, nextLine]
      return prev.map((line, index) => (index === editor.index ? nextLine : line))
    }

    if (editor.section === 'header') {
      setHeaderLines((prev) => applyUpdate(prev))
    } else {
      setFooterLines((prev) => applyUpdate(prev))
    }

    resetEditor()
  }

  function handleCancel() {
    resetEditor()
  }

  function handleDelete(section: Section, index: number) {
    if (section === 'header') {
      setHeaderLines((prev) => prev.filter((_, i) => i !== index))
      return
    }
    setFooterLines((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: '#fcfcfc',
      }}
    >
      <StatusBar />

      {/* Back + Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 16px',
          background: '#fcfcfc',
          borderBottom: '1px solid #e5e5ea',
          flexShrink: 0,
        }}
      >
        <button
          onClick={onBack}
          style={{
            border: 'none',
            background: 'none',
            color: '#262AFF',
            fontSize: 16, fontWeight: 700,
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            minWidth: 60,
          }}
        >
          Back
        </button>
        <span
          style={{
            flex: 1,
            textAlign: 'center',
            fontWeight: 700,
            fontSize: 18,
            color: '#04041C',
            marginRight: 60,
          }}
        >
          Header & Footer Lines
        </span>
      </div>

      {/* Scrollable content */}
      <div style={{ 
        flex: 1, overflowY: 'auto', padding: '16px',
        background: '#fcfcfc'

       }}>

        {/* ── Header Lines ── */}
        <SectionHeader
          title="Header Lines"
          onAdd={() => openAddEditor('header')}
        />

        {/* Preview block */}
        <PreviewBlock lines={headerLines} />

        {/* Existing header line cards */}
          {headerLines.map((line, i) => (
            editor?.section === 'header' && editor.index === i ? (
              <EditCard
                key={`header-edit-${i}`}
                text={draftText}
                onTextChange={setDraftText}
                font={draftFont}
                size={draftSize}
                alignment={draftAlignment}
                onSizeChange={setDraftSize}
                onAlignmentChange={setDraftAlignment}
                hasDone={hasDone}
                onDone={handleDone}
                onCancel={handleCancel}
              />
            ) : (
              <LineViewCard
                key={`header-${i}`}
                line={line}
                onEdit={() => openEditEditor('header', i, line)}
                onDelete={() => handleDelete('header', i)}
              />
            )
          ))}

        {/* Edit card for new header line */}
          {editor?.section === 'header' && editor.index === null && (
          <EditCard
            text={draftText}
            onTextChange={setDraftText}
            font={draftFont}
            size={draftSize}
            alignment={draftAlignment}
              onSizeChange={setDraftSize}
              onAlignmentChange={setDraftAlignment}
            hasDone={hasDone}
            onDone={handleDone}
            onCancel={handleCancel}
          />
        )}

        {/* ── Divider ── */}
        <div style={{ height: 1, background: '#abc6d8', margin: '20px 0' }} />

        {/* ── Footer Lines ── */}
        <SectionHeader title="Footer Lines" onAdd={() => openAddEditor('footer')} />

        <PreviewBlock lines={footerLines} />

          {footerLines.map((line, i) => (
            editor?.section === 'footer' && editor.index === i ? (
              <EditCard
                key={`footer-edit-${i}`}
                text={draftText}
                onTextChange={setDraftText}
                font={draftFont}
                size={draftSize}
                alignment={draftAlignment}
                onSizeChange={setDraftSize}
                onAlignmentChange={setDraftAlignment}
                hasDone={hasDone}
                onDone={handleDone}
                onCancel={handleCancel}
              />
            ) : (
              <LineViewCard
                key={`footer-${i}`}
                line={line}
                onEdit={() => openEditEditor('footer', i, line)}
                onDelete={() => handleDelete('footer', i)}
              />
            )
          ))}

          {editor?.section === 'footer' && editor.index === null && (
          <EditCard
            text={draftText}
            onTextChange={setDraftText}
            font={draftFont}
            size={draftSize}
            alignment={draftAlignment}
              onSizeChange={setDraftSize}
              onAlignmentChange={setDraftAlignment}
            hasDone={hasDone}
            onDone={handleDone}
            onCancel={handleCancel}
          />
        )}

        <div style={{ height: 40 }} />
      </div>
    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────────────── */

function SectionHeader({
  title,
  onAdd,
}: {
  title: string
  onAdd: () => void
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      }}
    >
      <span style={{ fontWeight: 700, fontSize: 17, color: '#04041C' }}>
        {title}
      </span>
      <button
        onClick={onAdd}
        style={{
          border: 'none',
          background: 'none',
          color: '#262AFF',
          fontSize: 16,
          fontWeight: 700,
          cursor: 'pointer',
          padding: 0,
          fontFamily: 'inherit',
        }}
      >
        Add
      </button>
    </div>
  )
}

function PreviewBlock({ lines }: { lines: Line[] }) {
  return (
    <div
      style={{
        border: '2px dashed #ABC6D8',
        borderRadius: 8,
        padding: '24px 16px',
        background: '#F8FAFC',
        marginBottom: 16,
        minHeight: 56,
      }}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          style={{
            fontSize: line.size,
            fontWeight: getFontWeight(line.font),
            textAlign:
              line.alignment.toLowerCase() as 'left' | 'center' | 'right',
            lineHeight: 1.6,
            color: '#04041C',
          }}
        >
          {line.text}
        </div>
      ))}
    </div>
  )
}

function LineViewCard({
  line,
  onEdit,
  onDelete,
}: {
  line: Line
  onEdit: () => void
  onDelete: () => void
}) {
  const [startX, setStartX] = useState<number | null>(null)
  const [dragX, setDragX] = useState(0)
  const [isSwiped, setIsSwiped] = useState(false)

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    setStartX(e.clientX)
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (startX === null) return
    const delta = e.clientX - startX
    if (delta >= 0) {
      setDragX(0)
      return
    }
    setDragX(Math.max(delta, -84))
  }

  function handlePointerUp() {
    if (startX === null) return
    setIsSwiped(dragX < -36)
    setDragX(0)
    setStartX(null)
  }

  const translateX = startX !== null ? dragX : isSwiped ? -84 : 0

  return (
    <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', marginBottom: 16 }}>
      <button
        onClick={onDelete}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 84,
          border: 'none',
          background: '#E04A4A',
          color: 'white',
          fontWeight: 700,
          fontSize: 14,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Delete
      </button>

      <div
        style={{
          backgroundColor: '#f5f7f7',
          borderRadius: 8,
          padding: '0px 12px 16px 12px',
          transform: `translateX(${translateX}px)`,
          transition: startX === null ? 'transform 0.2s ease' : 'none',
          touchAction: 'pan-y',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Text + edit icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#f0f3f7',
            margin: '0px -12px 12px -12px',
            borderRadius: 8,
            padding: '16px 12px',
          }}
        >
            <span style={{ fontSize: 16, color: '#04041C', flex: 1 }}>
            {line.text}
          </span>
          <button
            onClick={onEdit}
            style={{ border: 'none', background: 'none', padding: 0, cursor: 'pointer' }}
          >
            <img
              src="/icons/edit.svg"
              alt="Edit"
              style={{ width: 32, height: 32, objectFit: 'contain' }}
            />
          </button>
        </div>

        {/* Font + Size */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <MetaItem label="Font" value={line.font} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <MetaItem label="Size" value={String(line.size)} />
          </div>
        </div>
        <MetaItem label="Alignment" value={line.alignment} />
      </div>
    </div>
  )
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: 14, color: '#04041C', marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: '#04041C' }}>
        {value}
      </div>
    </div>
  )
}

function getFontWeight(font: string) {
  return font.toLowerCase().includes('bold') ? 700 : 400
}

function EditCard({
  text,
  onTextChange,
  font,
  size,
  alignment,
  onSizeChange,
  onAlignmentChange,
  hasDone,
  onDone,
  onCancel,
}: {
  text: string
  onTextChange: (v: string) => void
  font: string
  size: number
  alignment: Line['alignment']
  onSizeChange: (size: number) => void
  onAlignmentChange: (alignment: Line['alignment']) => void
  hasDone: boolean
  onDone: () => void
  onCancel: () => void
}) {
const [isTextFocused, setIsTextFocused] = useState(false)
  return (
    <div
      style={{
        background: '#f5f7f7',
        borderRadius: 10,
        padding: '14px 16px',
        marginBottom: 10,
      }}
    >
      {/* Text row */}
      <div style={{ marginBottom: 14 }}>
        <div style={labelStyle}>Text</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            autoFocus
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
            onFocus={() => setIsTextFocused(true)}
            onBlur={() => setIsTextFocused(false)}
            placeholder=""
            style={{
              flex: 1,
              padding: '10px 12px',
              border: isTextFocused ? '1px solid #262AFF' : '1px solid #ABC6D8',
              borderRadius: 6,
              fontSize: 16,
              fontFamily: 'inherit',
              outline: 'none',
              color: '#04041C',
              background: 'white',
              boxShadow: isTextFocused ? '0 0 0 2px rgba(38,42,255,0.25)' : 'none',
              transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
            }}
          />
          {hasDone ? (
            <button
              onClick={onDone}
              style={actionBtnStyle('#262AFF')}
            >
              Done
            </button>
          ) : (
            <button onClick={onCancel} style={actionBtnStyle('#262AFF')}>
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Font dropdown */}
      <div style={{ marginBottom: 14 }}>
        <div style={labelStyle}>Font</div>
        <DropdownRow value={font} />
      </div>

      {/* Size dropdown */}
      <div style={{ marginBottom: 14 }}>
        <div style={labelStyle}>Size</div>
        <SelectDropdown
          value={String(size)}
          options={SIZE_OPTIONS.map((option) => String(option))}
          onChange={(next) => onSizeChange(Number(next))}
        />
      </div>

      {/* Alignment dropdown */}
      <div>
        <div style={labelStyle}>Alignment</div>
        <SelectDropdown
          value={alignment}
          options={ALIGNMENT_OPTIONS}
          onChange={(next) => onAlignmentChange(next as Line['alignment'])}
        />
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  fontSize: 14,
  color: '#6B747D',
  fontWeight: 500,
  marginBottom: 6,
}

function actionBtnStyle(color: string): React.CSSProperties {
  return {
    border: 'none',
    background: 'none',
    color,
    fontSize: 17,
    fontWeight: 600,
    cursor: 'pointer',
    padding: 0,
    whiteSpace: 'nowrap',
    fontFamily: 'inherit',
  }
}

function DropdownRow({ value }: { value: string }) {
  return (
    <div
      style={{
        padding: '10px 12px',
        border: '1px solid #ABC6D8',
        borderRadius: 6,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'white',
      }}
    >
      <span style={{ fontSize: 16, color: '#04041C' }}>{value}</span>
       <img
            src="/icons/dropdown.svg"
            alt="dropdown"
            style={{ width: 16, height: 16, objectFit: 'contain' }}
          />
    </div>
  )
}

function SelectDropdown({
  value,
  options,
  onChange,
}: {
  value: string
  options: string[]
  onChange: (next: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: isOpen ? '1px solid #262AFF' : '1px solid #ABC6D8',
          borderRadius: 6,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'white',
          color: '#04041C',
          boxShadow: isOpen ? '0 0 0 2px rgba(38,42,255,0.25)' : 'none',
          transition: 'border-color 0.15s ease, box-shadow 0.15s ease',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 16,
          textAlign: 'left',
        }}
      >
        <span>{value}</span>
        <img
          src="/icons/dropdown.svg"
          alt="dropdown"
          style={{
            width: 16,
            height: 16,
            objectFit: 'contain',
            transform: isOpen ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.15s ease',
          }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            background: 'white',
            border: '1px solid #ABC6D8',
            borderRadius: 8,
            boxShadow: '0 8px 20px rgba(4,4,28,0.12)',
            zIndex: 20,
            maxHeight: 240,
            overflowY: 'auto',
            padding: '6px 0',
          }}
        >
          {options.map((option) => {
            const isSelected = option === value
            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
                style={{
                  width: '100%',
                  border: 'none',
                  background: isSelected ? '#F0F3F7' : 'transparent',
                  color: '#04041C',
                  fontSize: 16,
                  padding: '10px 12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontWeight: isSelected ? 700 : 500,
                }}
              >
                {option}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default HeaderFooterLines
