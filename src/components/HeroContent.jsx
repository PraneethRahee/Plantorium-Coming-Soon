import { useState } from 'react'
import { supabase } from '../lib/supabase'

const inputStyle = {
  width: '100%',
  padding: 'clamp(10px, 1.5vw, 14px) clamp(16px, 2vw, 24px)',
  border: 'none',
  backgroundColor: 'transparent',
  color: 'white',
  fontFamily: 'Inter, sans-serif',
  fontSize: 'clamp(12px, 1.8vw, 14px)',
  outline: 'none',
  minWidth: 0
}

const pillStyle = {
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '50px',
  width: '100%',
  backgroundColor: 'transparent'
}

export function HeroContent() {
  const [name, setName] = useState('')
  const [mobile, setMobile] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  const features = ['CONSULTING', 'DESIGN', 'EXECUTION', 'MAINTENANCE']

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation
    if (!name.trim()) {
      setMessage({ text: 'Please enter your name.', type: 'error' })
      return
    }

    const mobileRegex = /^[+]?[\d\s-]{7,15}$/
    if (!mobileRegex.test(mobile)) {
      setMessage({ text: 'Please enter a valid mobile number.', type: 'error' })
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage({ text: 'Please enter a valid email address.', type: 'error' })
      return
    }

    setLoading(true)
    setMessage({ text: '', type: '' })

    try {
      const { error } = await supabase
        .from('subscribers')
        .insert([{ name: name.trim(), mobile: mobile.trim(), email: email.trim() }])

      if (error) {
        if (error.code === '23505') {
          setMessage({ text: "You're already subscribed!", type: 'error' })
        } else {
          setMessage({ text: 'Something went wrong. Please try again.', type: 'error' })
          console.error('Supabase error:', error)
        }
      } else {
        setMessage({ text: "Thanks! We'll notify you at launch.", type: 'success' })
        setName('')
        setMobile('')
        setEmail('')
      }
    } catch (err) {
      setMessage({ text: 'Network error. Please try again.', type: 'error' })
      console.error('Submission error:', err)
    } finally {
      setLoading(false)
      setTimeout(() => setMessage({ text: '', type: '' }), 5000)
    }
  }

  return (
    <div className="hero-content" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'clamp(12px, 2.5vw, 20px)',
      width: '100%',
      padding: '0 15px',
      boxSizing: 'border-box'
    }}>
      {/* Features */}
      <div className="features-row" style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 500,
        fontSize: 'clamp(11px, 2.5vw, 18px)',
        lineHeight: '120%',
        letterSpacing: '0px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 'clamp(6px, 1.5vw, 10px)'
      }}>
        {features.map((feature, index) => (
          <div key={feature} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px, 1.5vw, 10px)' }}>
            <span>{feature}</span>
            {index < features.length - 1 && (
              <span style={{ opacity: 0.6 }}>·</span>
            )}
          </div>
        ))}
      </div>

      {/* Coming Soon Heading */}
      <h1 className="coming-soon-heading" style={{
        fontFamily: 'Brygada 1918, serif',
        fontWeight: 700,
        fontSize: 'clamp(2rem, 8vw, 65px)',
        lineHeight: '100%',
        letterSpacing: '0px',
        color: 'white',
        margin: '0',
        textAlign: 'center'
      }}>
        Coming Soon
      </h1>

      {/* Description */}
      <p style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: 'clamp(13px, 2vw, 18px)',
        lineHeight: '150%',
        letterSpacing: '0px',
        color: 'rgba(255, 255, 255, 0.9)',
        margin: '0',
        maxWidth: '600px',
        textAlign: 'center',
        padding: '0 10px'
      }}>
        We are creating something amazing! our new website is under construction. Stay tuned for an awesome experience
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(8px, 1.2vw, 12px)',
        marginTop: 'clamp(5px, 1.5vw, 10px)',
        width: 'min(500px, calc(100vw - 40px))'
      }}>
        {/* Name + Mobile Row */}
        <div className="form-row" style={{
          display: 'flex',
          gap: 'clamp(8px, 1.2vw, 12px)',
          width: '100%'
        }}>
          <div style={{ ...pillStyle, flex: 1 }}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              disabled={loading}
              required
              style={inputStyle}
            />
          </div>

          <div style={{ ...pillStyle, flex: 1 }}>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              disabled={loading}
              required
              style={inputStyle}
            />
          </div>
        </div>

        {/* Email Field */}
        <div style={pillStyle}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            disabled={loading}
            required
            style={inputStyle}
          />
        </div>

        {/* Get in touch Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 'clamp(12px, 1.8vw, 16px) clamp(40px, 8vw, 80px)',
            backgroundColor: '#c9a876',
            color: '#032E1D',
            border: 'none',
            borderRadius: '50px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(13px, 1.8vw, 16px)',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.3s',
            whiteSpace: 'nowrap',
            opacity: loading ? 0.7 : 1,
            marginTop: 'clamp(2px, 0.5vw, 6px)'
          }}
          onMouseEnter={(e) => !loading && (e.target.style.opacity = '0.9')}
          onMouseLeave={(e) => !loading && (e.target.style.opacity = '1')}
        >
          {loading ? 'Sending...' : 'Get in touch'}
        </button>
      </form>

      {/* Toast Notification */}
      {message.text && (
        <div className="toast" style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 1000,
          padding: '14px 24px',
          borderRadius: '12px',
          backgroundColor: message.type === 'success' ? '#c9a876' : '#ff6b6b',
          color: message.type === 'success' ? '#032E1D' : '#fff',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: 500,
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
          animation: 'slideIn 0.4s ease-out'
        }}>
          {message.text}
        </div>
      )}
    </div>
  )
}
