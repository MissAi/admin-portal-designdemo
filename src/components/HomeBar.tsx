const MOBILE_BROWSER_UA = /Android|iPhone|iPad|iPod|Mobile|Windows Phone|webOS|BlackBerry/i

function shouldHideMockSystemBarsOnThisDevice() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false
  }

  return MOBILE_BROWSER_UA.test(navigator.userAgent)
}

export default function HomeBar() {
  if (shouldHideMockSystemBarsOnThisDevice()) {
    return null
  }

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