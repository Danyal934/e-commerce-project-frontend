import { useState } from 'react';

const StripeCheckout = ({ amount, onSuccess }) => {
  const [processing, setProcessing] = useState(false);
  
  const handlePayment = () => {
    setProcessing(true);
    
    // Mock payment processing
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 2000);
  };
  
  return (
    <div className="card p-4">
      <h4>Card Details (Test Mode)</h4>
      <div className="my-3">
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Card Number" 
          defaultValue="4242 4242 4242 4242"
          readOnly
        />
        <div className="row">
          <div className="col">
            <input 
              type="text" 
              className="form-control" 
              placeholder="MM/YY" 
              defaultValue="12/25"
              readOnly
            />
          </div>
          <div className="col">
            <input 
              type="text" 
              className="form-control" 
              placeholder="CVC" 
              defaultValue="123"
              readOnly
            />
          </div>
        </div>
      </div>
      
      <button 
        className={`btn btn-primary w-100 ${processing ? 'disabled' : ''}`}
        onClick={handlePayment}
      >
        {processing ? 'Processing...' : `Pay $${amount}`}
      </button>
      
      <p className="text-muted small mt-3">
        <strong>Test Card:</strong> 4242 4242 4242 4242<br />
        Any future date, any 3-digit CVC
      </p>
    </div>
  );
};

export default StripeCheckout;
