import { Link, useNavigate } from 'react-router-dom';
import LightThing from './assets/luminescence-mark.svg'

const HEADER_H = 80;

const HeaderComponent = () => {
  const navigate = useNavigate();

  return (
    <>
      <header
        id="site-header"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          background: 'linear-gradient(135deg, #0c1525 0%, #1a2a3a 50%, #0c1525 100%)',
          color: 'white',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          zIndex: 10,
          borderBottom: '1px solid #3c8c8c'
        }}
      >
        {/* Left: Logo and Brand */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
            flexShrink: 0
          }}
          onClick={() => navigate("/")}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.02)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <img
            src={LightThing}
            alt="Luminescence logo"
            style={{
              height: '50px',
              width: 'auto',
              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.4))'
            }}
          />
          <span style={{
            fontWeight: '700',
            fontSize: '1.5rem',
            color: 'white',
            textShadow: '0 2px 8px rgba(255, 255, 255, 0.3)'
          }}>
            Exo-Existence
          </span>
        </div>

        {/* Center: Tagline */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          flex: 1
        }}>
          <h2 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: 'white',
            margin: 0,
            letterSpacing: '0.5px',
            textShadow: '0 2px 8px rgba(255, 255, 255, 0.3)',
            whiteSpace: 'nowrap'
          }}>
            Mapping the Unknown Universe — One Exoplanet at a Time
          </h2>
        </div>

        {/* Right: Spacer for balance */}
        <div style={{ width: '200px', flexShrink: 0 }}></div>
      </header>

      {/* Navigation */}
      <nav
        id="site-nav"
        style={{
          position: 'fixed',
          left: 0,
          width: '100%',
          background: 'linear-gradient(135deg, #0c1525 0%, #1a2a3a 100%)',
          color: 'white',
          zIndex: 9,
          top: '80px',
          borderBottom: '1px solid #3c8c8c',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '44px',
          padding: '0 2rem',
          gap: '2rem'
        }}>
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#0c1525';
              e.currentTarget.style.backgroundColor = '#72d4f3';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Home
          </Link>
          <Link
            to="/exoplanetsim"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#0c1525';
              e.currentTarget.style.backgroundColor = '#72d4f3';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Simulation
          </Link>
          <Link
            to="/test"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#0c1525';
              e.currentTarget.style.backgroundColor = '#72d4f3';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            3D Exoplanets
          </Link>
          <Link
            to="/mem"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#0c1525';
              e.currentTarget.style.backgroundColor = '#72d4f3';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Team Members
          </Link>
          <Link
            to="/ml-details"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#0c1525';
              e.currentTarget.style.backgroundColor = '#72d4f3';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Machine Learning Details
          </Link>
          <Link
            to="/machine-learning"
            style={{
              color: 'white',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#0c1525';
              e.currentTarget.style.backgroundColor = '#72d4f3';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Find Exo Planets
          </Link>
        </div>

        {/* Decorative Accent Bar */}
        <div style={{
          height: '2px',
          background: 'linear-gradient(90deg, #72d4f3, #64dcdc, #3c8c8c)',
          width: '100%'
        }} />
      </nav>
    </>
  );
};

export default HeaderComponent;