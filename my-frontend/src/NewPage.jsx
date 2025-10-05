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
