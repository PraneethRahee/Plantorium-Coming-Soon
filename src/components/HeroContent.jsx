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
  const [submitted, setSubmitted] = useState(false)
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
        setSubmitted(true)
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

      {/* Title */}
      <h1 className="coming-soon-heading" style={{
        fontFamily: 'Brygada 1918, serif',
        fontWeight: 700,
        fontSize: submitted ? 'clamp(2rem, 6vw, 72px)' : 'clamp(1.2rem, 4.5vw, 56px)',
        lineHeight: '100%',
        letterSpacing: '0px',
        color: 'white',
        margin: '0',
        textAlign: 'center',
        whiteSpace: submitted ? 'normal' : 'nowrap',
        transition: 'all 0.4s ease'
      }}>
        {submitted ? 'Thanks for reaching out' : 'Landscape consulting & design'}
      </h1>

      {/* Subtext */}
      <p className="hero-subtext" style={{
        fontFamily: 'Inter, sans-serif',
        fontWeight: 400,
        fontSize: submitted ? 'clamp(11px, 1.8vw, 22px)' : 'clamp(13px, 2vw, 18px)',
        lineHeight: submitted ? '120%' : '150%',
        letterSpacing: '0px',
        color: 'rgba(255, 255, 255, 0.9)',
        margin: '0',
        maxWidth: submitted ? 'none' : '600px',
        textAlign: 'center',
        padding: '0 10px',
        whiteSpace: submitted ? 'nowrap' : 'normal'
      }}>
        {submitted ? (
          'Your message just showed up in my inbox. talk to you soon'
        ) : (
          <>
            <span className="subtext-line1">You bring the brief. We handle everything after.</span><br className="mobile-break" /> Leave your details and we'll start the conversation.
          </>
        )}
      </p>

      {/* Form Wrapper */}
      <div style={{
        position: 'relative',
        width: 'min(500px, calc(100vw - 40px))',
        marginTop: 'clamp(5px, 1.5vw, 10px)'
      }}>
      {/* Thank You Screen */}
      {submitted ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(16px, 2.5vw, 24px)',
          textAlign: 'center',
          animation: 'fadeIn 0.6s ease-in'
        }}>
          {/* WhatsApp Connect */}
          <a
            href="https://wa.me/919620508938"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(8px, 1vw, 12px)',
              textDecoration: 'none',
              color: 'white',
              fontFamily: '"Bricolage Grotesque", sans-serif',
              fontWeight: 500,
              fontSize: 'clamp(11px, 2vw, 22px)',
              lineHeight: '120%',
              transition: 'opacity 0.3s',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="clamp(16px, 2.5vw, 28px)"
              height="clamp(16px, 2.5vw, 28px)"
              style={{ width: 'clamp(16px, 2.5vw, 28px)', height: 'clamp(16px, 2.5vw, 28px)', flexShrink: 0 }}
              fill="#25D366"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span>Connect : +91 96205 08938</span>
          </a>

          {/* Back to Home Button */}
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: 'clamp(12px, 1.8vw, 16px) clamp(40px, 8vw, 80px)',
              backgroundColor: '#c9a876',
              color: '#032E1D',
              border: 'none',
              borderRadius: '50px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(13px, 1.8vw, 16px)',
              cursor: 'pointer',
              transition: 'opacity 0.3s',
              whiteSpace: 'nowrap',
              marginTop: 'clamp(2px, 0.5vw, 6px)'
            }}
            onMouseEnter={(e) => (e.target.style.opacity = '0.9')}
            onMouseLeave={(e) => (e.target.style.opacity = '1')}
          >
            Back to Home
          </button>
        </div>
      ) : (
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'clamp(8px, 1.2vw, 12px)',
        width: '100%',
        animation: 'fadeIn 0.4s ease-in'
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
          {loading ? 'Sending...' : 'Start a Conversation'}
        </button>
      </form>
      )}
      </div>

      {/* Error Toast Notification */}
      {message.text && message.type === 'error' && (
        <div className="toast" style={{
          position: 'fixed',
          top: '30px',
          right: '30px',
          zIndex: 1000,
          padding: '20px 32px',
          borderRadius: '14px',
          backgroundColor: '#ff6b6b',
          color: '#fff',
          fontFamily: 'Inter, sans-serif',
          fontSize: '18px',
          fontWeight: 600,
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
          animation: 'slideIn 0.4s ease-out',
          minWidth: '280px'
        }}>
          {message.text}
        </div>
      )}
    </div>
  )
}
