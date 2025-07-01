import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const WowPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex items-center justify-center">
      <div className="container" style={{ maxWidth: '900px' }}>
        <div className="text-center">
          <h1 
            className="display-4 fw-bold mb-4" 
            style={{ 
              color: '#2c3e50',
              letterSpacing: '2px',
              marginBottom: '2rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            À VOUS DE RACONTER LE
          </h1>
          
          <h2 
            className="display-5 mb-5" 
            style={{ 
              color: '#18bebc',
              fontStyle: 'italic',
              fontWeight: '300',
              fontSize: '4rem',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}
          >
            "WOW" 
          </h2>

          <div className="row justify-content-center mt-5">
            <div className="col-md-8">
              <p className="lead text-muted mb-5" style={{ fontSize: '1.2rem' }}>
                Rejoignez notre plateforme de compétitions régionales et montrez vos talents exceptionnels !
              </p>
            </div>
          </div>

          <div className="d-flex flex-column flex-md-row gap-3 justify-content-center align-items-center">
            <button
              onClick={() => navigate('/login')}
              className="btn btn-lg px-5 py-3"
              style={{
                backgroundColor: '#18bebc',
                border: 'none',
                color: 'white',
                borderRadius: '50px',
                fontWeight: '600',
                fontSize: '1.1rem',
                minWidth: '200px',
                boxShadow: '0 4px 15px rgba(24, 190, 188, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(24, 190, 188, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(24, 190, 188, 0.3)';
              }}
            >
              Se Connecter
            </button>

            <button
              onClick={() => navigate('/register')}
              className="btn btn-outline-primary btn-lg px-5 py-3"
              style={{
                borderColor: '#18bebc',
                color: '#18bebc',
                borderRadius: '50px',
                fontWeight: '600',
                fontSize: '1.1rem',
                minWidth: '200px',
                borderWidth: '2px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#18bebc';
                e.target.style.color = 'white';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(24, 190, 188, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#18bebc';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              S'inscrire
            </button>
          </div>

          <div className="mt-5 pt-4">
            <div className="row text-center">
              <div className="col-md-4 mb-3">
                <div className="p-3">
                  <div className="mb-3">
                    <i className="fas fa-trophy" style={{ fontSize: '2rem', color: '#18bebc' }}></i>
                  </div>
                  <h5 style={{ color: '#2c3e50' }}>Compétitions</h5>
                  <p className="text-muted small">Participez à des défis passionnants</p>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="p-3">
                  <div className="mb-3">
                    <i className="fas fa-users" style={{ fontSize: '2rem', color: '#18bebc' }}></i>
                  </div>
                  <h5 style={{ color: '#2c3e50' }}>Communauté</h5>
                  <p className="text-muted small">Rencontrez d'autres talents</p>
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <div className="p-3">
                  <div className="mb-3">
                    <i className="fas fa-star" style={{ fontSize: '2rem', color: '#18bebc' }}></i>
                  </div>
                  <h5 style={{ color: '#2c3e50' }}>Excellence</h5>
                  <p className="text-muted small">Atteignez de nouveaux sommets</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WowPage;