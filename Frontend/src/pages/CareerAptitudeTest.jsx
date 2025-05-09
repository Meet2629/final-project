import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fullQuestionList from './questions'; // make sure this is valid

const streamScores = {
  Science: 0,
  Commerce: 0,
  Arts: 0,
  Vocational: 0,
  Design: 0,
};

const CareerAptitudeTest = () => {
  const questions = fullQuestionList;
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState({ ...streamScores });
  const [showResult, setShowResult] = useState(false);
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();

  const handleAnswer = (stream) => {
    if (!stream) return;

    const updatedScores = { ...scores, [stream]: scores[stream] + 1 };
    setScores(updatedScores);
    setResponses([...responses, stream]);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const getTopStreams = () => {
    const maxScore = Math.max(...Object.values(scores));
    return Object.keys(scores).filter((key) => scores[key] === maxScore);
  };

  const progressPercent = questions.length
    ? Math.round(((current + 1) / questions.length) * 100)
    : 0;

  const submitResults = async () => {
    const name = prompt("Enter your name to save your results:");
    if (!name) return;

    try {
      const response = await fetch('http://localhost:3000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, responses, scores }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Results saved! Redirecting to AI Pathway for: ${data.topStreams[0]}`);
        navigate('/ai-pathway', { state: { topStream: data.topStreams[0] } });
      } else {
        alert('Error saving results: ' + data.error);
      }
    } catch (error) {
      console.error(error);
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <div style={{
      fontFamily: 'Comic Sans MS, sans-serif',
      background: 'linear-gradient(135deg, #000428, #004e92)',
      minHeight: '100vh',
      padding: '40px',
      color: 'white'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#111',
        borderRadius: '20px',
        boxShadow: '0 0 20px rgba(0,123,255,0.7)',
        padding: '30px',
        textAlign: 'center'
      }}>
        <h1 style={{ color: '#00BFFF', marginBottom: '30px' }}>Career Stream Aptitude Test</h1>

        {!showResult ? (
          questions[current] ? (
            <>
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  color: '#aaa'
                }}>
                  <strong>Question {current + 1} of {questions.length}</strong>
                  <span>{progressPercent}%</span>
                </div>
                <div style={{ height: '10px', backgroundColor: '#333', borderRadius: '5px' }}>
                  <div style={{
                    width: `${progressPercent}%`,
                    height: '100%',
                    backgroundColor: '#00BFFF',
                    borderRadius: '5px'
                  }}></div>
                </div>
              </div>

              <div style={{
                backgroundColor: '#fff',
                color: '#000',
                padding: '20px',
                borderRadius: '15px',
                border: '3px solid #FFD700',
                marginBottom: '20px'
              }}>
                <h2 style={{ margin: 0 }}>{questions[current].question}</h2>
              </div>

              <div>
                {questions[current].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.stream)}
                    style={{
                      display: 'inline-block',
                      width: '45%',
                      margin: '10px 2.5%',
                      padding: '12px 0',
                      backgroundColor: '#007BFF',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontSize: '16px',
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#007BFF'}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p>Loading questions...</p>
          )
        ) : (
          <div>
            <h2 style={{ color: '#00BFFF' }}>Your Top Stream(s)</h2>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              fontSize: '18px',
              color: '#fff',
              fontWeight: 'bold'
            }}>
              {getTopStreams().map((stream, idx) => (
                <li key={idx} style={{ margin: '10px 0' }}>{stream}</li>
              ))}
            </ul>
            <button
              onClick={submitResults}
              style={{
                marginTop: '20px',
                padding: '12px 20px',
                backgroundColor: '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Save My Results
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerAptitudeTest;
