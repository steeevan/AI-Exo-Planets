const FooterComponent = () => {
  return (
    <footer style={{
      width: '100vw',
      background: 'linear-gradient(135deg, #0c1525 0%, #1a2a3a 50%, #0c1525 100%)',
      borderTop: '1px solid #3c8c8c',
      padding: '3rem 2rem 2rem',
      marginTop: 'auto',
      boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3)'
    }}>
      {/* Main Footer Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        alignItems: 'start'
      }}>

        {/* Team & Credits Section */}
        <section
          id="team"
          title="Team & Credits"
          style={{
            background: 'linear-gradient(145deg, rgba(26, 42, 58, 0.6) 0%, rgba(12, 21, 37, 0.8) 100%)',
            padding: '2rem',
            borderRadius: '20px',
            border: '1px solid #447894',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <h2 style={{
            margin: '0 0 1rem 0',
            fontSize: '1.5rem',
            fontWeight: '700',
            background: 'linear-gradient(45deg, #64dcdc, #72d4f3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            Team & Credits
          </h2>
          <div style={{
            color: '#ffffff',
            fontSize: '1.1rem',
            lineHeight: '1.6',
            marginBottom: '1.5rem'
          }}>
            <p style={{ margin: '0 0 1rem 0' }}>
              Built with passion and precision by the <strong style={{ color: '#72d4f3' }}>Luminescence</strong> team.
            </p>
            <p style={{ margin: 0, opacity: 0.9 }}>
              Exploring the cosmos through code and creativity.
            </p>
          </div>

          {/* Team Members Quick List */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginTop: '1.5rem'
          }}>
            {['Estevan', 'Lily', 'Brista', 'Alisa', 'Yanming'].map((member) => (
              <span
                key={member}
                style={{
                  background: 'rgba(114, 212, 243, 0.1)',
                  color: '#72d4f3',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '15px',
                  fontSize: '0.85rem',
                  border: '1px solid rgba(114, 212, 243, 0.3)'
                }}
              >
                {member}
              </span>
            ))}
          </div>
        </section>

        {/* Mission Statement */}
        <section style={{
          background: 'linear-gradient(145deg, rgba(26, 42, 58, 0.6) 0%, rgba(12, 21, 37, 0.8) 100%)',
          padding: '2rem',
          borderRadius: '20px',
          border: '1px solid #447894',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{
            margin: '0 0 1rem 0',
            fontSize: '1.3rem',
            fontWeight: '600',
            color: '#64dcdc',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            Our Mission
          </h3>
          <p style={{
            color: '#ffffff',
            fontSize: '1rem',
            lineHeight: '1.6',
            margin: 0,
            opacity: 0.9
          }}>
            To demonstrate space exploration through innovative technology,
            making exoplanet discovery and visualization accessible to everyone.
          </p>

          {/* Tech Stack */}
          <div style={{ marginTop: '1.5rem' }}>
            <h4 style={{
              color: '#72d4f3',
              fontSize: '1rem',
              margin: '0 0 0.75rem 0',
              fontWeight: '600'
            }}>
              Built With
            </h4>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {['React', 'Three.js', 'AI/ML', 'WebGL', 'NASA API'].map((tech) => (
                <span
                  key={tech}
                  style={{
                    background: 'rgba(100, 220, 220, 0.1)',
                    color: '#64dcdc',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '15px',
                    fontSize: '0.8rem',
                    border: '1px solid rgba(100, 220, 220, 0.3)'
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Copyright Bar */}
      <div style={{
        maxWidth: '1200px',
        margin: '2rem auto 0',
        padding: '1.5rem 0 0',
        borderTop: '1px solid #3c8c8c',
        textAlign: 'center'
      }}>
        <small style={{
          color: '#72d4f3',
          fontSize: '0.9rem',
          fontWeight: '500',
          display: 'block',
          marginBottom: '0.5rem'
        }}>
          © {new Date().getFullYear()} Luminescence • Exo-Existence
        </small>
        <div style={{
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '0.8rem'
        }}>
          Mapping the Unknown Universe — One Exoplanet at a Time
        </div>

        {/* Decorative Accent */}
        <div style={{
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #72d4f3, #64dcdc, #3c8c8c, transparent)',
          width: '100%',
          marginTop: '1rem',
          borderRadius: '2px'
        }} />
      </div>
    </footer>
  );
};

export default FooterComponent;