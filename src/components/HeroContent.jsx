import { useState } from 'react'
import { supabase } from '../lib/supabase'

export function HeroContent() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })
  const features = ['CONSULTING', 'DESIGN', 'EXECUTION', 'MAINTENANCE']

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic email validation
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
        .insert([{ email }])

      if (error) {
        if (error.code === '23505') {
          setMessage({ text: "You're already subscribed!", type: 'error' })
        } else {
          setMessage({ text: 'Something went wrong. Please try again.', type: 'error' })
          console.error('Supabase error:', error)
        }
      } else {
        setMessage({ text: "Thanks! We'll notify you at launch.", type: 'success' })
        setEmail('')
      }
    } catch (err) {
      setMessage({ text: 'Network error. Please try again.', type: 'error' })
      console.error('Submission error:', err)
    } finally {
      setLoading(false)
      // Auto-clear message after 5 seconds
      setTimeout(() => setMessage({ text: '', type: '' }), 5000)
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'clamp(12px, 2.5vw, 20px)',
      width: '100%',
      padding: '0 15px',
      boxSizing: 'border-box'
    }}>
      {/* Features */}
      <div style={{
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
      <h1 style={{
        fontFamily: 'Brygada 1918, serif',
        fontWeight: 700,
        fontSize: 'clamp(2rem, 10vw, 90px)',
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

      {/* Email Form */}
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 'clamp(5px, 1.5vw, 10px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: '50px',
        padding: 'clamp(4px, 0.8vw, 6px)',
        width: 'min(500px, calc(100vw - 40px))',
        backgroundColor: 'transparent'
      }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          disabled={loading}
          required
          style={{
            flex: 1,
            padding: 'clamp(8px, 1.5vw, 12px) clamp(12px, 2vw, 20px)',
            border: 'none',
            backgroundColor: 'transparent',
            color: 'white',
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(12px, 1.8vw, 14px)',
            outline: 'none',
            minWidth: 0
          }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 'clamp(8px, 1.5vw, 12px) clamp(16px, 3vw, 28px)',
            backgroundColor: '#c9a876',
            color: '#032E1D',
            border: 'none',
            borderRadius: '50px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: 'clamp(12px, 1.8vw, 14px)',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'opacity 0.3s',
            whiteSpace: 'nowrap',
            opacity: loading ? 0.7 : 1,
            flexShrink: 0
          }}
          onMouseEnter={(e) => !loading && (e.target.style.opacity = '0.9')}
          onMouseLeave={(e) => !loading && (e.target.style.opacity = '1')}
        >
          {loading ? 'Sending...' : 'Get in touch'}
        </button>
      </form>

      {/* Status Message */}
      {message.text && (
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 'clamp(12px, 1.8vw, 14px)',
          color: message.type === 'success' ? '#c9a876' : '#ff6b6b',
          margin: '0',
          textAlign: 'center',
          animation: 'fadeIn 0.3s ease-in'
        }}>
          {message.text}
        </p>
      )}
    </div>
  )
}
