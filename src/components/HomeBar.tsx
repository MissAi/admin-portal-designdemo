export default function HomeBar() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 10,
        transform: 'translateX(-50%)',
        width: 134,
        height: 5,
        borderRadius: 999,
        background: '#0B0B0D',
        opacity: 0.9,
        pointerEvents: 'none',
      }}
    />
  )
}