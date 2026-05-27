import { Logo } from './Logo'
import { HeroContent } from './HeroContent'
import { PlantDecorationLeft, PlantDecorationLeftForeground } from './PlantDecorationLeft'
import { PlantDecorationRight, PlantDecorationRightForeground } from './PlantDecorationRight'

export function ComingSoonPage() {
  return (
    <div style={{
      background: 'radial-gradient(39.76% 71.33% at 50% 28.67%, #135E3D 0%, #032E1D 100%)',
      height: '100vh',
      width: '100%',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(20px, 5vw, 40px) clamp(10px, 3vw, 20px)',
      boxSizing: 'border-box'
    }}>
      <PlantDecorationLeft />
      <PlantDecorationLeftForeground />
      <PlantDecorationRight />
      <PlantDecorationRightForeground />

      <div style={{
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        maxWidth: '900px',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto'
      }}>
        <div style={{ marginBottom: 'clamp(15px, 3vw, 30px)', flexShrink: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Logo />
        </div>

        <div style={{ flexShrink: 0, width: '100%', display: 'flex', justifyContent: 'center' }}>
          <HeroContent />
        </div>
      </div>
    </div>
  )
}
