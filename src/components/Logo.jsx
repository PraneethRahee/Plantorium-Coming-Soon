export function Logo() {
  return (
    <div className="logo-container" style={{ textAlign: 'center' }}>
      <img
        src="/plantorium-logo.png"
        alt="Plantorium Logo"
        className="logo-img"
        style={{
          height: 'auto',
          filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.1))'
        }}
      />
    </div>
  )
}
