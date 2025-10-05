import { Link } from "react-router-dom";

export default function NewPage() {
  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>This is a blank page</h1>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Link to="/" className="link">
          Go Back
        </Link>
      </div>
    </main>
  )
}
import React from 'react';

// Example data structure for exoplanets, including a placeholder for an image URL.
// Replace image_placeholder.jpg with actual image URLs.
const exoplanetData = [
  { name: 'Kepler-186f', id: 'K186F', estimatedDiameter: '14,900,000 meters', orbitingBody: 'Kepler-186', imageUrl: 'image_placeholder.jpg' },
  { name: 'TRAPPIST-1e', id: 'T1E', estimatedDiameter: '12,500,000 meters', orbitingBody: 'TRAPPIST-1', imageUrl: 'image_placeholder.jpg' },
  { name: 'Gliese 581g', id: 'G581G', estimatedDiameter: '17,000,000 meters', orbitingBody: 'Gliese 581', imageUrl: 'image_placeholder.jpg' },
  { name: 'Proxima b', id: 'PB', estimatedDiameter: '13,000,000 meters', orbitingBody: 'Proxima Centauri', imageUrl: 'image_placeholder.jpg' },
  { name: 'HD 209458 b', id: 'H209B', estimatedDiameter: '200,000,000 meters', orbitingBody: 'HD 209458', imageUrl: 'image_placeholder.jpg' },
  // Add more exoplanets here...
];

const cardStyle = {
  // Style for the individual exoplanet information card
  backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent dark background
  color: '#00FFFF', // Cyan/light-blue text color, similar to the reference
  border: '2px solid rgba(0, 255, 255, 0.5)', // Light border
  borderRadius: '10px',
  padding: '1rem',
  margin: '1rem',
  boxShadow: '0 0 10px rgba(0, 255, 255, 0.8)', // Glowing effect
  textAlign: 'left',
  minHeight: '200px', // Ensure cards have a similar height
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between', // Push image and text to edges
};

const planetNameStyle = {
  fontSize: '1.25rem',
  fontWeight: 'bold',
  color: '#39FF14', // Neon green for the name
  marginBottom: '0.5rem',
  textShadow: '0 0 5px #39FF14', // subtle glow
};

const planetImageStyle = {
  width: '100%',
  height: 'auto',
  maxHeight: '100px', // Constrain image height
  objectFit: 'cover',
  borderRadius: '5px',
  marginBottom: '1rem',
  border: '1px solid rgba(255, 255, 255, 0.3)',
};

export default function NewPage() {
  return (
    <main style={{
      textAlign: "center",
      padding: "2rem",
      // Background style similar to the reference image (space nebula)
      backgroundImage: 'url("https://wallpapers.com/images/hd/4k-space-background-gx2rdfrem5bvjbqi.jpg")', // Placeholder URL for a nebula/space image. **Replace this with a local image or a suitable URL.**             backgroundSize: 'cover',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
    }}>
      <h1 style={{ color: 'white', textShadow: '0 0 10px #FFD700' }}>Exoplanets List</h1>
      <p style={{ color: 'white', marginBottom: '2rem' }}>A catalogue of confirmed and candidate exoplanets.</p>

      {/* Grid layout for the cards, similar to the 5-column layout in the reference */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', // Responsive 5-column or more
        gap: '1rem',
        maxWidth: '1600px', // Max width for the whole grid
        margin: '0 auto', // Center the grid
      }}>
        {exoplanetData.map((planet) => (
          // Exoplanet Card
          <div key={planet.id} style={cardStyle}>
            <div style={{ flexGrow: 1 }}>
              <img
                src={planet.imageUrl}
                alt={`Conceptual image of ${planet.name}`}
                style={planetImageStyle}
              />
              <p style={planetNameStyle}>Name: {planet.name}</p>
              <p>ID: {planet.id}</p>
              <p>Estimated Diameter: {planet.estimatedDiameter}</p>
              <p>Orbiting Body: {planet.orbitingBody}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

// You will need to replace the placeholder background image URL and the planet image URLs
// with actual images for the final result.