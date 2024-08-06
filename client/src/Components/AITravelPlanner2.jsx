import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import "../styles/Planner.css"
import Markdown from 'react-markdown';
import jsPDF from 'jspdf';

const Form = ({ country, budget, tripDuration, accommodation, travelStyle, travelType, situation, onCountryChange, onBudgetChange, onTripDurationChange, onAccommodationChange, onTravelStyleChange, onTravelTypeChange, onSituationChange, onGenerateResponse, isLoading }) => (
  <div className="container">
    <label>Destination Country:</label>
    <textarea value={country} onChange={(e) => onCountryChange(e.target.value)}></textarea>
    <label>Budget:</label>
    <textarea value={budget} onChange={(e) => onBudgetChange(e.target.value)}></textarea>
    <label>Trip Duration (in Days):</label>
    <textarea value={tripDuration} onChange={(e) => onTripDurationChange(e.target.value)}></textarea>
    <label>Accommodation:</label>
    <select value={accommodation} onChange={(e) => onAccommodationChange(e.target.value)}>
      <option>Hotel</option>
      <option>Camping</option>
      <option>Resort</option>
      <option>Hostel</option>
      <option>Homestay</option>
    </select>
    <label>Travel Style:</label>
    <select value={travelStyle} onChange={(e) => onTravelStyleChange(e.target.value)}>
      <option>Culture</option>
      <option>Adventure</option>
      <option>Relaxation</option>
      <option>Beach</option>
      <option>Ski</option>
      <option>Wildlife Safari</option>
      <option>Road Trip</option>
    </select>
    <label>Travel Type:</label>
    <select value={travelType} onChange={(e) => onTravelTypeChange(e.target.value)}>
      <option>Car</option>
      <option>Bus</option>
      <option>Train</option>
      <option>Walk</option>
    </select>
    <label>Any other thing in mind.....(not mandatory)</label>
    <textarea
      rows="4"
      cols="50"
      value={situation}
      onChange={(e) => onSituationChange(e.target.value)}
    ></textarea>
    <br />
    <button onClick={onGenerateResponse} disabled={isLoading}>
      Generate Response
    </button>
    {isLoading && <p className="loading">Loading...</p>}
  </div>
);

const Response = ({ response, isResponseAvailable }) => (
  <div className="container">
    <h2>Your Ai itinerary:</h2>
    {/* Use Markdown to render the response */}
    <Markdown>{response}</Markdown>
    {isResponseAvailable && (
      <button className="download-button" onClick={() => {
        // Generate PDF and download
        const pdf = new jsPDF();
        pdf.text(response, 10, 10);
        pdf.save('Travel.pdf');
      }}>
        Download as PDF
      </button>
    )}
  </div>
);

const MadeBy = () => (
  <div className='made-by'><span role="img" aria-label="symbol">❤️</span>Made with love by Kashish</div>
);

const Planner = () => {
  const [country, setCountry] = useState('');
  const [budget, setBudget] = useState('');
  const [tripDuration, setTripDuration] = useState('');
  const [accommodation, setAccommodation] = useState('Hotel');
  const [travelStyle, setTravelStyle] = useState('Culture');
  const [travelType, setTravelType] = useState('Car');
  const [situation, setSituation] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Google Generative AI
  const genAI = new GoogleGenerativeAI('AIzaSyAhMO5GF4nU_a8kuXi21UUCeC8iKjTNn4Y'); // Replace 'YOUR_API_KEY' with your actual API key

  const handleGenerateResponse = async () => {
    try {
      setIsLoading(true);

      if (!genAI) {
        console.error('Invalid key');
        return;
      }

      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      const prompt = `Create a travel itinerary starting from Delhi on the first day. Consider the following aspects: 
        (1) Destination country: ${country},
        (2) Budget: ${budget},
        (3) Trip duration in days: ${tripDuration},
        (4) Accommodation preference: ${accommodation},
        (5) Travel style: ${travelStyle},
        (6) Travel type: ${travelType},
        (7) Legal situation (if any): ${situation}.`;

      const result = await model.generateContent(prompt);
      const generatedResponse = await result.response.text();

      setResponse(generatedResponse);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="navbar">
        <h1>Travel<span style={{ color: 'blue' }}> Itinerary</span></h1>
      </div>
      <Form
        country={country}
        budget={budget}
        tripDuration={tripDuration}
        accommodation={accommodation}
        travelStyle={travelStyle}
        travelType={travelType}
        situation={situation}
        onCountryChange={setCountry}
        onBudgetChange={setBudget}
        onTripDurationChange={setTripDuration}
        onAccommodationChange={setAccommodation}
        onTravelStyleChange={setTravelStyle}
        onTravelTypeChange={setTravelType}
        onSituationChange={setSituation}
        onGenerateResponse={handleGenerateResponse}
        isLoading={isLoading}
      />
      {response && <Response response={response} isResponseAvailable={!isLoading} />}
      <MadeBy />
    </div>
  );
};

export default Planner;
